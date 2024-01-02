import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const userData = {
	firstName: 'Ivan',
	lastName: 'Ivić',
	email: 'ivan.ivic@example.com',
	dateOfBirth: '1990-01-01',
	role: 'Admin',
	subscriptionExpirationDate: '2025-01-01',
	avatar: 'https://placekitten.com/200/200',
};

const MyProfile = () => {
	return (
		<Container className='mt-5'>
			<Row>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Image
								src={userData.avatar}
								roundedCircle
								fluid
							/>
							<Card.Title className='mt-3'>{`${userData.firstName} ${userData.lastName}`}</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								{userData.email}
							</Card.Subtitle>
							<Card.Text>
								<strong>Datum rođenja:</strong> {userData.dateOfBirth}
								<br />
								<strong>Rola:</strong> {userData.role}
								<br />
								<strong>Istek pretplate:</strong>{' '}
								{userData.subscriptionExpirationDate}
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
