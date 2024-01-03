import React from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const AddBook = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [author, setAuthor] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get("/api/knjiznica/autori/getAllAuthors");
        setAuthor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axios.get("/api/knjiznica/knjige/getAllGenres");
        setGenre(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthor();
    fetchGenres();
  }, []);

  const handleAuthorSelect = (selectedOption) => {
    setSelectedAuthorId(selectedOption.value);
  };

  const formattedAuthors = author.map((autor) => ({
    value: autor.id,
    label: `${autor.id} - ${autor.first_name} ${autor.last_name}`,
  }));

  const formattedGenres = genre.map((zanr) => ({
    value: zanr.id,
    label: `${zanr.id} - ${zanr.name}`,
  }));

  const handleGenresSelect = (selectedOptions) => {
    // Dohvati ID-jeve odabranih žanrova
    const selectedGenreIds = selectedOptions.map((option) => option.value);

    // Spremi ID-jeve odabranih žanrova u state varijablu
    setSelectedGenres(selectedGenreIds);
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={7} lg={5} xs={10}>
          <Card className="shadow" bg="light" border="dark">
            <Card.Body>
              <Card.Title className="text-center fs-1">Dodaj knjigu</Card.Title>
              <Form>
                <Form.Group className="mb-2 fw-bold" controlId="formBasicName">
                  <Form.Label>Naslov</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Unesi naslov knjige"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2 fw-bold" controlId="formBasicName">
                  <Form.Label>Autor</Form.Label>
                  <Select
                    name="Autori"
                    isSearchable={true}
                    options={formattedAuthors}
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={handleAuthorSelect}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2 fw-bold d-flex flex-column"
                  controlId="formBasicName"
                >
                  <Form.Label>Datum izdavanja</Form.Label>
                  <DatePicker
                    selected={releaseDate}
                    onChange={(date) => setReleaseDate(date)}
                  />
                </Form.Group>

                <Form.Group className="mb-2 fw-bold" controlId="formBasicName">
                  <Form.Label>Žanr</Form.Label>
                  <Select
                    isMulti
                    name="Žanrovi"
                    options={formattedGenres}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleGenresSelect}
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="fw-bold fs-5"
                >
                  Dodaj knjigu
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBook;
