import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ActiveFilters from './ActiveFilters';
import Badge from 'react-bootstrap/Badge';

const FilterBooks = ({ onAuthorFilterChange, onGenreFilterChange }) => {
	const [show, setShow] = useState(false);
	const [selectedItemsAuthor, setSelectedItemsAuthor] = useState([]);
	const [selectedItemsGenre, setSelectedItemsGenre] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [genreses, setGenres] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchAuthor = async () => {
			try {
				const response = await axios.get('/api/knjiznica/autori/getAllAuthors');
				setAuthors(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		const fetchGenres = async () => {
			try {
				const response = await axios.get('/api/knjiznica/knjige/getAllGenres');
				setGenres(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAuthor();
		fetchGenres();
	}, []);

	const handleAuthorCheckboxChange = (value, id) => {
		if (selectedItemsAuthor.includes(value)) {
			setSelectedItemsAuthor(
				selectedItemsAuthor.filter((item) => item !== value)
			);
		} else {
			setSelectedItemsAuthor([...selectedItemsAuthor, value]);
		}

		onAuthorFilterChange(id);
	};

	const handleGenresCheckboxChange = (value, id) => {
		if (selectedItemsGenre.includes(value)) {
			setSelectedItemsGenre(
				selectedItemsGenre.filter((item) => item !== value)
			);
		} else {
			setSelectedItemsGenre([...selectedItemsGenre, value]);
		}

		onGenreFilterChange(id);
	};

	return (
		<>
			<Button
				className='m-2'
				variant='primary'
				onClick={handleShow}
			>
				Filtriraj
			</Button>

			<Offcanvas
				show={show}
				onHide={handleClose}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Filter</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Dropdown>
						<Dropdown.Toggle
							variant='success'
							id='dropdown-basic'
						>
							Autor
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Form>
								{authors &&
									authors.map((author) => (
										<Form.Check
											key={author.id}
											type='checkbox'
											id={`checkbox-${author.id}`}
											label={`${author.first_name} ${author.last_name}`}
											checked={selectedItemsAuthor.includes(
												`${author.first_name} ${author.last_name}`
											)}
											onChange={() =>
												handleAuthorCheckboxChange(
													`${author.first_name} ${author.last_name}`,
													author.id
												)
											}
											className='mx-2'
										/>
									))}
							</Form>
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='my-3'>
						<Dropdown.Toggle
							variant='success'
							id='dropdown-basic'
						>
							Žanr
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Form>
								{genreses &&
									genreses.map((genre) => (
										<Form.Check
											key={genre.id}
											type='checkbox'
											id={`checkbox-${genre.id}`}
											label={genre.name}
											checked={selectedItemsGenre.includes(genre.name)}
											onChange={() =>
												handleGenresCheckboxChange(genre.name, genre.id)
											}
											className='mx-2'
										/>
									))}
							</Form>
						</Dropdown.Menu>
					</Dropdown>
					<ActiveFilters
						authors={selectedItemsAuthor}
						genres={selectedItemsGenre}
					/>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default FilterBooks;
