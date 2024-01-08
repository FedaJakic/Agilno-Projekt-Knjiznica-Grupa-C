import React from 'react';
import { Row, Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import bookImage from '../images/book.jpg';
import { toast } from 'react-hot-toast';

const BookDetails = () => {
	const { id } = useParams();
	const [book, setBook] = useState({});
	const [myLendings, setMyLendings] = useState([]);
	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await axios.get(`/api/knjiznica/knjige/books/${id}`);
				setBook(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchBook();
		fetchActiveLendings();
	}, []);

	const handleLent = async (book_id) => {
		const data = {
			lent_date: new Date(),
			book_id,
		};
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		try {
			const { response } = await axios.post(`/api/reservation`, data, config);
			if (response) {
				toast.error(response.error);
			} else {
				toast.success('Knjiga iznajmljena!');
				fetchActiveLendings();
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

	return (
		<div>
			<Container
				style={{
					minHeight: '85vh',
				}}
			>
				<Row className='d-flex justify-content-center align-items-center mt-5'>
					<Card style={{ width: '18rem' }}>
						<Card.Img
							variant='top'
							src={bookImage}
						/>
						<Card.Body>
							<Card.Title>{book.title}</Card.Title>
							<Card.Text>
								{book.description ? (
									<span>{book.description}</span>
								) : (
									<span>Nema opisa</span>
								)}
							</Card.Text>
						</Card.Body>
						<ListGroup className='list-group-flush'>
							<ListGroup.Item>
								{book.Author?.first_name + ' ' + book.Author?.last_name}
							</ListGroup.Item>
							<ListGroup.Item>
								{'Žanr: ' + book.Genres?.map((genre) => genre.name).join(', ')}
							</ListGroup.Item>
							<ListGroup.Item>
								{'Broj dostupnih knjiga: ' + book.quantity}
							</ListGroup.Item>
						</ListGroup>
						<Card.Body>
							<Button
								variant='info'
								size='sm'
								className={`m-1 ${
									myLendings.some(
										(lending) => lending.book_id.toString() === id
									)
										? 'disabled'
										: ''
								}`}
								onClick={() => handleLent(id)}
							>
								Iznajmi
							</Button>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
};

export default BookDetails;
