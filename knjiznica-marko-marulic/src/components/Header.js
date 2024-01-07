import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
	function redirect() {
		localStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('role');
		localStorage.removeItem('firstName');
		window.location.href = '/';
	}
	const firstName = localStorage.getItem('firstName') || undefined;

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
							<Link
								to='/knjiznica'
								className='text-decoration-none  mx-1'
								style={{
									color: 'white',
								}}
							>
								<i class='fa-solid fa-book mx-1'></i> Knjižnica
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
