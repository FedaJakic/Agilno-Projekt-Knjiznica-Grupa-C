import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ProfileEdit = () => {
	const [ime, setIme] = useState('Ivan');
	const [prezime, setPrezime] = useState('Ivić');
	const [email, setEmail] = useState('ivan.ivic@example.com');
	const [datumRodjenja, setDatumRodjenja] = useState('1990-01-01');

	const handleSubmit = (e) => {
		console.log('uredi');
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
							Ažuriraj
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default ProfileEdit;
