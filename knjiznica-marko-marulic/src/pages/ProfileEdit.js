import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProfileEdit = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const userId = localStorage.getItem('id');

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const responseUser = await axios.get(
					`/api/users/userProfile/${userId}`
				);

				setFirstName(responseUser.data.first_name);
				setLastName(responseUser.data.last_name);
				setEmail(responseUser.data.email);
				setDateOfBirth(responseUser.data.date_of_birth);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserProfile();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.put(`/api/users/userProfile/${userId}`, {
				first_name: firstName,
				last_name: lastName,
				email: email,
				date_of_birth: dateOfBirth,
			});

			if (data.success) {
				toast.success('User profile updated successfully');
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error(error);
			toast.error('Error updating profile. Please try again.');
		}
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
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
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
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
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
								value={dateOfBirth}
								onChange={(e) => setDateOfBirth(e.target.value)}
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
