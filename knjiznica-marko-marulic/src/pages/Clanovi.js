import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Clanovi = () => {
	const [users, setUsers] = useState([]);
	const token = localStorage.getItem('token');
	const [searchTerm, setSearchTerm] = useState('');
	const role = localStorage.getItem('role');
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
		if (searchTerm === '') {
			return true;
		}

		const term = searchTerm.toLowerCase();
		return (
			user.first_name.toLowerCase().includes(term) ||
			user.last_name.toLowerCase().includes(term) ||
			user.email.toLowerCase().includes(term)
		);
	};

	const handleDelete = async (id) => {
		try {
			const { data } = await axios.delete(`/api/users/${id}`);

			if (data.error) {
				toast.error(data.error);
			} else {
				window.location.reload();
				toast.success('Successful Delete');
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
	};

	return (
		<Container
			style={{
				height: '85vh',
				overflowY: 'scroll',
			}}
		>
			<h1
				className='text-center'
				style={{
					margin: '20px 0',
				}}
			>
				Članovi
			</h1>
			<div
				className='fw-bold fs-2 m-1'
				style={{ color: '#ffe6a7' }}
			>
				{localStorage.getItem('role') === '1' && (
					<Link to='/addUser'>
						<Button
							variant='primary'
							className='m-2'
						>
							Dodaj korisnika+
						</Button>
					</Link>
				)}
			</div>

			<nav
				className='navbar navbar-light bg-light'
				style={{ marginBottom: '20px' }}
			>
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
						<tr
							style={{ cursor: 'pointer' }}
							key={user.id}
						>
							<td onClick={() => history.push(`/knjige/clan/${user.id}`)}>
								{user.first_name}
							</td>

							<td onClick={() => history.push(`/knjige/clan/${user.id}`)}>
								{user.last_name}
							</td>

							<td onClick={() => history.push(`/knjige/clan/${user.id}`)}>
								{user.email}
							</td>

							<td onClick={() => history.push(`/knjige/clan/${user.id}`)}>
								{user.date_of_birth}
							</td>
							{role === '1' && (
								<td>
									<Button
										variant='info'
										size='sm'
										className='mx-1'
									>
										<Link
											to={`/profil-edit/${user.id}`}
											className='text-decoration-none text-dark flex-grow-1'
										>
											Uredi
										</Link>
									</Button>
									<Button
										size='sm'
										className='mx-1'
										onClick={() => handleDelete(user.id)}
									>
										Izbriši
									</Button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Clanovi;
