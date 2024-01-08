import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserProfile = {
	firstName: '',
	lastName: '',
	email: '',
	dateOfBirth: '',
	role: '',
};

const Header = () => {
	function redirect() {
		localStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('role');
		localStorage.removeItem('firstName');
		window.location.href = '/';
	}
	const token = localStorage.getItem("token") || ''
	const firstName = localStorage.getItem('firstName') || undefined;
	const [userProfile, setUserProfile] = useState(UserProfile);

	const fetchUserProfile = async () => {
		if(token){
			const config = {
				headers: {
				  'Authorization': `Bearer ${token}`,
				  'Content-Type': 'application/json',
				},
			  };
			  try {
				  const responseUser = await axios.get(`/api/users/me`, config);
				  console.log(responseUser);
				  setUserProfile({
					  firstName: responseUser.data.data.first_name,
					  lastName: responseUser.data.data.last_name,
					  email: responseUser.data.data.email,
					  dateOfBirth: responseUser.data.data.date_of_birth,
					  role: responseUser.data.data.role_id,
				  });
			  } catch (error) {
				  console.error(error);
			  }
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, [token]);

	return (
		<header>
			<Navbar
				expand='lg'
				collapseOnSelect
				className='navbar navbar-expand-lg bg-dark'
				data-bs-theme='dark'
			>
				<Container>
					<Navbar.Brand>
						<Link
							className='header-brand-name'
							to='/'
						>
							Knjiznica Marko Marulic
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto d-flex align-items-center'>
							<Link
								to='/'
								className='text-decoration-none  mx-1'
								style={{
									color: 'white',
								}}
							>
								<i className='fa-solid fa-home'></i> Početna
							</Link>

							{userProfile.role === 1 && 
								<Link
									to='/clanovi'
									className='text-decoration-none mx-1'
									style={{
										color: 'white',
									}}
								>
									<i className='fa-solid fa-user-group'></i> Članovi
								</Link>
							
							}
							<Link
								to='/knjiznica'
								className='text-decoration-none  mx-1'
								style={{
									color: 'white',
								}}
							>
								<i className='fa-solid fa-book mx-1'></i> Knjižnica
							</Link>
							<Link
								to='/profil'
								className='text-decoration-none mx-1'
								style={{
									color: 'white',
								}}
							>
								<i className='fa-solid fa-user mx-1'></i>Profil
								{firstName && <span className='mx-1'> - {firstName}</span>}
							</Link>
							{firstName ? (
								<Button
									onClick={redirect}
									variant='warning'
									size='sm'
									style={{
										height: '40px',
									}}
								>
									Odjava
								</Button>
							) : (
								<Button
									className=' mx-2'
									variant='warning'
									size='sm'
									style={{
										height: '40px',
									}}
								>
									<Link
										to='/prijava'
										className='text-decoration-none'
									>
										Prijava
									</Link>
								</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
