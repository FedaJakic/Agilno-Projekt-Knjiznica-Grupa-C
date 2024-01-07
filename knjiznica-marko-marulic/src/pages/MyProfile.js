import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserProfile = {
	firstName: '',
	lastName: '',
	email: '',
	dateOfBirth: '',
	role: '',
	subscriptionExpirationDate: '',
	avatar: 'https://placekitten.com/200/200',
};

const MyProfile = () => {
	const [userProfile, setUserProfile] = useState(UserProfile);
	const userId = localStorage.getItem('id');

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const responseUser = await axios.get(
					`/api/users/userProfile/${userId}`
				);
				const roleResponse = await axios.get(
					`/api/roles/${responseUser.data.role_id}`
				);
				const membershipResponse = await axios.get(
					`/api/memberships/${userId}`
				);

				setUserProfile({
					firstName: responseUser.data.first_name,
					lastName: responseUser.data.last_name,
					email: responseUser.data.email,
					dateOfBirth: responseUser.data.date_of_birth,
					role: roleResponse.data.name,
					subscriptionExpirationDate:
						membershipResponse.data.subscription_end || 'Nije pretplacen',
				});
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserProfile();
	}, []);

	return (
		<Container className='mt-5'>
			<Row>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Image
								src={'https://placekitten.com/200/200'}
								roundedCircle
								fluid
							/>
							<Card.Title className='mt-3'>{`${userProfile.firstName} ${userProfile.lastName}`}</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								{userProfile.email}
							</Card.Subtitle>
							<Card.Text>
								<strong>Datum rođenja:</strong> {userProfile.dateOfBirth}
								<br />
								<strong>Rola:</strong> {userProfile.role}
								<br />
								<strong>Istek pretplate:</strong>{' '}
								{userProfile.subscriptionExpirationDate}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={8}>
					<h2>Najam knjiga</h2>
					<ListGroup
						as='ol'
						numbered
					>
						<ListGroup.Item as='li'>Gospodar prstenova</ListGroup.Item>
						<ListGroup.Item as='li'>Mačak u čizmama</ListGroup.Item>
						<ListGroup.Item as='li'>Proces</ListGroup.Item>
					</ListGroup>
					<Button
						className='float-end mx-3 my-5'
						type='submit'
					>
						<Link
							className='header-brand-name'
							to='/profil-edit'
						>
							Uredi profil
						</Link>
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default MyProfile;
