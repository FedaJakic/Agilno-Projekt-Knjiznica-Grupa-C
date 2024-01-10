import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import FilterBooks from '../components/FilterBooks.js';

const Knjiznica = () => {
	const [books, setBooks] = useState([]);
	const [myLendings, setMyLendings] = useState([]);
	const [selectedAuthorFilters, setSelectedAuthorFilters] = useState([]);
	const [selectedGenreFilters, setSelectedGenreFilters] = useState([]);
	const [membership, setMembership] = useState(null)

	const [search, setSearch] = useState('');
	const role = localStorage.getItem('role');
	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get(
					'/api/knjiznica/knjige/getAllBooksWithGenre'
				);
				setBooks(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBooks();

		const fetchMembershipStatus = async() => {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};
			try {
				const response = await axios.get('/api/memberships/user/status', config);
				setMembership(response.data.status);
			} catch (error) {
				console.error(error);
			}
		}

		fetchMembershipStatus()
	}, []);

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
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchActiveLendings();
	}, []);

	useEffect(() => {
		const fetchBooksWithFilter = async () => {
			try {
				const response = await axios.get(
					'/api/knjiznica/knjige/getAllBooksWithGenre'
				);
				if (
					selectedAuthorFilters.length > 0 ||
					selectedGenreFilters.length > 0
				) {
					let filteredBooks = null;
					if (
						selectedAuthorFilters.length > 0 &&
						selectedGenreFilters.length === 0
					) {
						filteredBooks = response.data.filter((item) =>
							selectedAuthorFilters.includes(item.author_id)
						);
					} else if (
						selectedAuthorFilters.length === 0 &&
						selectedGenreFilters.length > 0
					) {
						filteredBooks = response.data.filter((item) =>
							selectedGenreFilters.includes(item.genre_id)
						);
					} else {
						filteredBooks = response.data.filter((item) =>
							selectedAuthorFilters.includes(item.author_id)
						);
						filteredBooks = filteredBooks.filter((item) =>
							selectedGenreFilters.includes(item.genre_id)
						);
					}
					setBooks(filteredBooks);
				} else setBooks(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBooksWithFilter();
	}, [selectedAuthorFilters, selectedGenreFilters]);

	const handleDelete = async (id) => {
		try {
			const { data } = await axios.delete(`/api/knjiznica/knjige/books/${id}`);

			if (data.error) {
				toast.error(data.error);
			} else {
				window.location.reload();
				toast.success('Successful Delete');
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

	const handleAuthorFilterChange = (author) => {
		setSelectedAuthorFilters((prevFilters) => {
			return prevFilters.includes(author)
				? prevFilters.filter((filter) => filter !== author)
				: [...prevFilters, author];
		});
	};

	const handleGenreFilterChange = (genre) => {
		setSelectedGenreFilters((prevFilters) => {
			return prevFilters.includes(genre)
				? prevFilters.filter((filter) => filter !== genre)
				: [...prevFilters, genre];
		});
	};

	return (
		<Container
			style={{
				height: '85vh',
				overflowY: 'scroll',
			}}
		>
			<h1 className='text-center'>Knjige</h1>
			<div
				className='fw-bold fs-2 m-1'
				style={{ color: '#ffe6a7' }}
			>
				{localStorage.getItem('role') === '1' && (
					<Link to='/addBook'>
						<Button
							variant='primary'
							className='m-2'
						>
							Dodaj knjigu+
						</Button>
					</Link>
				)}
				<FilterBooks
					onAuthorFilterChange={handleAuthorFilterChange}
					onGenreFilterChange={handleGenreFilterChange}
				/>
			</div>
			<nav className='navbar navbar-light bg-light'>
				<form className='container-fluid'>
					<div className='input-group'>
						<input
							type='text'
							onChange={(e) => setSearch(e.target.value)}
							className='form-control'
							placeholder='Search Book'
							aria-describedby='basic-addon1'
						/>
					</div>
				</form>
			</nav>
			<Table
				bordered
				hover
			>
				<thead>
					<tr>
						<th>Naslov</th>
						<th>Datum izdavanja</th>
					</tr>
				</thead>
				<tbody>
					{books
						.filter((book) => {
							return search.toLowerCase() === ''
								? book
								: book.title.toLowerCase().includes(search);
						})
						.map((book) => (
							<tr key={book.id}>
								<td className='d-flex'>
									<Link
										to={`/bookDetails/${book.id}`}
										className='text-decoration-none text-dark flex-grow-1'
									>
										{book.title}
									</Link>

									{role === '2' && (
										<Button
											variant='info'
											size='sm'
											className={`m-1 ${
												myLendings.some((lending) => lending.book_id === book.id) || book.quantity < 1 || !membership
													? 'disabled'
													: ''
											}`}
											onClick={() => handleLent(book.id)}
										>
											{book.quantity < 1 ? 'Nestalo' : 'Iznajmi'}
										</Button>
									)}

									{role === '1' && (
										<>
											<Button
												variant='info'
												size='sm'
												className='m-1'
											>
												<Link
													to={`/updateBook/${book.id}`}
													className='text-decoration-none text-dark flex-grow-1'
												>
													Uredi
												</Link>
											</Button>
											<Button
												size='sm'
												className='m-1'
												onClick={() => handleDelete(book.id)}
											>
												Izbriši
											</Button>
										</>
									)}
								</td>

								<td>{book.release_date}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Knjiznica;
