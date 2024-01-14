import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
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
	const [myLendings, setMyLendings] = useState([]);
	const userId = localStorage.getItem('id');
	const token = localStorage.getItem('token');

	const fetchUserProfile = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		try {
			const responseUser = await axios.get(`/api/users/userProfile/${userId}`);
			const roleResponse = await axios.get(
				`/api/roles/${responseUser.data.role_id}`
			);
			const membershipResponse = await axios.get(
				`/api/memberships/user/last`,
				config
			);

			setUserProfile({
				firstName: responseUser.data.first_name,
				lastName: responseUser.data.last_name,
				email: responseUser.data.email,
				dateOfBirth: responseUser.data.date_of_birth,
				role: roleResponse.data.name,
				subscriptionExpirationDate:
					membershipResponse.data?.subscription_end || 'Isteklo',
			});
		} catch (error) {
			console.error(error);
		}
	};

	const fetchActiveLendings = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.get('/api/reservation/active/me', config);
			setMyLendings(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const extendMembership = () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		  };
		axios.post("/api/memberships/extend", {}, config)
		.then(() => {
			toast.success('Uspješno ste produžili pretplatu');
			fetchUserProfile();
		});
	};


	useEffect(() => {
		fetchUserProfile();
		fetchActiveLendings();
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
								<strong>Pretplata do:</strong>{' '}
								{userProfile.subscriptionExpirationDate}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={8}>
					<h2>Trenutno iznajmljene knjige</h2>
					{myLendings ? (
						<ListGroup
							as='ol'
							numbered
						>
							{myLendings.map((lending) => {
								return (
									<ListGroup.Item as='li'>
										<Link
											to={`/bookDetails/${lending.Book.id}`}
											className='text-decoration-none text-dark flex-grow-1'
										>
											{lending.Book.title}
										</Link>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					) : (
						<p>Niste iznajmili niti jednu knjigu.</p>
					)}
					<Button
						className='float-end mx-3 my-5'
						type='submit'
					>
						<Link
							className='header-brand-name'
							to={`/profil-edit/${userId}`}
						>
							Uredi profil
						</Link>
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button
						className='float mx-3 my-4'
						type='submit'
						onClick={extendMembership}
					>
						Produži pretplatu
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default MyProfile;
