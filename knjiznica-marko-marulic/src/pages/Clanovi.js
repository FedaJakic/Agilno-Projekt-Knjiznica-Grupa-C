import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Clanovi = () => {
	const [users, setUsers] = useState([]);
	const token = localStorage.getItem('token');
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

	useEffect(() => {
        const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};
		const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/users', config);
                console.log(response.data.data);
				setUsers(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUsers();
	}, []);

    const filterUsers = (user) => {
        if (searchTerm === "") {
            return true;
        }

        const term = searchTerm.toLowerCase();
        return user.first_name.toLowerCase().includes(term) ||
            user.last_name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term);
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
            }}>Članovi</h1>

        

            <nav className='navbar navbar-light bg-light'  style={{marginBottom: '20px'}}>
				<form className='container-fluid'>
					<div className='input-group'>
						<input
							type='text'
							onChange={(e) => setSearchTerm(e.target.value)}
							className='form-control'
							placeholder='Pretraži korisnike'
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
						<th>Ime</th>
                        <th>Prezime</th>
						<th>Email</th>
                        <th>Datum rođenja</th>
					</tr>
				</thead>
                <tbody>
                {users.filter(filterUsers).map((user) => (
                        <tr style={{cursor: 'pointer'}} key={user.id} onClick={() => history.push(`/knjige/clan/${user.id}`)}>
                            <td className='d-flex'>
                                {user.first_name}
                            </td>

                            <td>{user.last_name}</td>

                            <td>{user.email}</td>

                            <td>{user.date_of_birth}</td>
                        </tr>
                    ))}
                </tbody>
			</Table>
		</Container>
	);
};

export default Clanovi;
