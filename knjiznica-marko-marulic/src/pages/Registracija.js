import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Registracija = () => {
	const [ime, setIme] = useState('');
	const [prezime, setPrezime] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [datumRodjenja, setDatumRodjenja] = useState('');

	if (localStorage.getItem('token') != null) {
		//navigate('/'); maknit se ca od tu - vec smo prijavljeni
		return;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			'Registrirani ste!',
			ime,
			prezime,
			email,
			password,
			datumRodjenja
		);

		if (!ime || !prezime || !email || !password || !datumRodjenja) {
			console.log('Empty fields are not allowed');
			return;
		}

		fetch('http://localhost:5000/api/registracija', {
			method: 'POST',
			body: JSON.stringify({
				ime: ime,
				prezime: prezime,
				email: email,
				password: password,
				datumRodjenja: datumRodjenja,
			}),
			headers: { 'Content-type': 'application/json;charset=UTF-8' },
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log('User Registered!');
				//navigate('/prijava'); -> Prebacit korisnika na login
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col
					xs={12}
					md={6}
				>
					<Form
						className='d-flex flex-column justify-content-center align-items-center'
						onSubmit={handleSubmit}
					>
						<Form.Group
							className='my-2 w-50'
							controlId='formIme'
						>
							<Form.Label>Ime</Form.Label>
							<Form.Control
								type='text'
								placeholder='Unesite ime'
								value={ime}
								onChange={(e) => setIme(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='my-2 w-50'
							controlId='formPrezime'
						>
							<Form.Label>Prezime</Form.Label>
							<Form.Control
								type='text'
								placeholder='Unesite prezime'
								value={prezime}
								onChange={(e) => setPrezime(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='my-2 w-50'
							controlId='formBasicEmail'
						>
							<Form.Label>Email adresa</Form.Label>
							<Form.Control
								type='email'
								placeholder='Unesite email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='my-2 w-50'
							controlId='formBasicPassword'
						>
							<Form.Label>Lozinka</Form.Label>
							<Form.Control
								type='password'
								placeholder='Unesite lozinku'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='my-2 w-50'
							controlId='formDatumRodjenja'
						>
							<Form.Label>Datum rođenja</Form.Label>
							<Form.Control
								type='date'
								value={datumRodjenja}
								onChange={(e) => setDatumRodjenja(e.target.value)}
							/>
						</Form.Group>

						<Button
							className='my-2 w-50'
							variant='primary'
							type='submit'
						>
							Registriraj se
						</Button>
						<Form.Text className='text-muted'>
							<p>
								{`Ukoliko već imate registriran profil, `}
								<Link to='/prijava'>{`prijavite se ovdje`}</Link>.
							</p>
						</Form.Text>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Registracija;
