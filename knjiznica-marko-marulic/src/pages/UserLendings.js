import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import toast from 'react-hot-toast';


const UserLendings = () => {
    const { id } = useParams();

	const [userLendings, setUserLendings] = useState([]);
	const token = localStorage.getItem('token');
    const [searchTerm, setSearchTerm] = useState('');


    const fetchUserLendings = async () => {
        const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};
        try {
            const response = await axios.get(`/api/reservation/active/user/${id}`, config);
            console.log(response);
            setUserLendings(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

	useEffect(() => {
		fetchUserLendings();
	}, []);

    const handleReturnBook = async (lending) => {
        lending.return_date = new Date()

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		try {
			const { response } = await axios.put(`/api/reservation/${lending.id}`, lending, config);
			if (response) {
				toast.error(response.error);
			} else {
				toast.success('Knjiga vraćena!');
				fetchUserLendings();
			}
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.message);
			}
		}
    }

    const filterBooks = (book) => {
        if (searchTerm === "") {
            return true;
        }

        const term = searchTerm.toLowerCase();
        return book.Book.title.toLowerCase().includes(term);
    };


	return (
		<Container
			style={{
				height: '85vh',
				overflowY: 'scroll',
			}}
		>
			<h1 className='text-center' style={{
                margin: '20px 0'
            }}>Iznajmljene knjige</h1>


            {userLendings.length 
                ? (
                    <>
                    <nav className='navbar navbar-light bg-light'  style={{marginBottom: '20px'}}>
                        <form className='container-fluid'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='form-control'
                                    placeholder='Pretraži knjige'
                                    aria-describedby='basic-addon1'
                                />
                            </div>
                        </form>
                    </nav>
                    <Table
                        bordered
                        hover
                    >
                        <thead>
                            <tr>
                                <th>Naslov</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userLendings
                            .filter(filterBooks)
                            .map((lending) => (
                                    <tr key={lending.Book.id}>
                                        <td className='d-flex'>
                                            <Link
                                                to={`/bookDetails/${lending.Book.id}`}
                                                className='text-decoration-none text-dark flex-grow-1'
                                                >
                                                {lending.Book.title}
                                            </Link>
                                                <Button
                                                    size='sm'
                                                    className='m-1'
                                                    onClick={() => handleReturnBook(lending)}
                                                    >
                                                    Potvrdi povrat
                                                </Button>									
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    </>
                ) :
                (
                <p>Ovaj korisnik trenutno ne posjeduje ni jednu knjigu</p>
                )
            }
		</Container>
	);
};

export default UserLendings;
