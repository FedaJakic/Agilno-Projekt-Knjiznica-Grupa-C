import React from 'react';
import {
	Row,
	Col,
	Container,
	Card,
	ListGroup,
	Button,
	Form,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import bookImage from '../images/book.jpg';

const BookDetails = () => {
	const { id } = useParams();
	const [book, setBook] = useState({});
	const [reviews, setReview] = useState([]);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [myLendings, setMyLendings] = useState([]);
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('id');

	const getCurrentDate = () => {
		const date = new Date();
		const month = date.getUTCMonth() + 1; // months from 1-12
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();
		return year + '-' + month + '-' + (day + 1);
	};

	const handleStarClick = (value) => {
		setRating(value);
	};

	const createReview = async () => {
		if (!id || !rating || !comment) {
			return;
		}

		for (var i in reviews) {
			if (reviews[i].user_id_fk == userId) {
				toast.error('You already have a review for this book');
				return;
			}
		}

		try {
			const { data } = await axios.post('/api/reviews/addReview', {
				bookId: id,
				userId: userId,
				reviewDate: getCurrentDate(),
				rating: rating,
				reviewComment: comment,
			});

			if (data.success) {
				toast.success('Review added successfully');
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error(error);
			toast.error('Error adding book. Please try again.');
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

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await axios.get(`/api/knjiznica/knjige/books/${id}`);
				setBook(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchReviews = async () => {
			try {
				const response = await axios.get(`/api/reviews/${id}`);
				setReview(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBook();
		fetchReviews();
		fetchActiveLendings();
	}, []);

	return (
		<div>
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
									{'Žanr: ' +
										book.Genres?.map((genre) => genre.name).join(', ')}
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
			<div>
				<section>
					<Container className='pt-5'>
						<Row>
							<Col>
								<h1>Reviews</h1>
								<Container
									style={{
										height: '600px',
										overflowY: 'scroll',
									}}
								>
									{reviews.map((review) => (
										<div key={review.id}>
											<span>{review.review_date}</span>
											<br />
											<p>{review.review_text}</p>
											<div>
												<p className='mb-0'>Rated:</p>
												{[1, 2, 3, 4, 5].map((value) => (
													<span
														className={`cursor-pointer fs-3 ${
															value <= review.rating
																? 'text-warning'
																: 'text-muted'
														}`}
													>
														&#9733;
													</span>
												))}
											</div>
										</div>
									))}
								</Container>
							</Col>
							<Col>
								<Form
									className='d-flex flex-column justify-content-center align-items-center'
									onSubmit={createReview}
								>
									<h4>Pošalji review</h4>
									<Form.Group
										className='my-2 w-50'
										controlId='formIme'
									>
										<Form.Label>Komentar</Form.Label>
										<Form.Control
											as='textarea'
											rows={5}
											style={{ width: '350px' }}
											onChange={(e) => setComment(e.target.value)}
										/>
									</Form.Group>

									<Form.Group
										className='my-2 w-50'
										controlId='formPrezime'
									>
										<Row>
											<Form.Label>Rejting</Form.Label>
										</Row>
										<Col>
											<Form.Group>
												{[1, 2, 3, 4, 5].map((value) => (
													<span
														className={`cursor-pointer fs-3 ${
															value <= rating ? 'text-warning' : 'text-muted'
														}`}
														onClick={() => handleStarClick(value)}
													>
														&#9733;
													</span>
												))}
											</Form.Group>
										</Col>
									</Form.Group>

									<Button
										className='my-2 w-50'
										variant='primary'
										type='submit'
									>
										Submit
									</Button>
								</Form>
							</Col>
						</Row>
					</Container>
				</section>
			</div>
		</div>
	);
};

export default BookDetails;
