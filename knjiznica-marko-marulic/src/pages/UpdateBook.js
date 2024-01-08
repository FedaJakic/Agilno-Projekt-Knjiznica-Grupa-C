import React from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import axios from "axios";
const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [author, setAuthor] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorSurname, setAuthorSurname] = useState("");
  const [authorBirthDate, setAuthorBirthDate] = useState(new Date());
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/knjiznica/knjige/books/${id}`);

        setTitle(response.data.title);
        setReleaseDate(Date.parse(response.data.release_date));
        setSelectedAuthorId(response.data.Author.id);
        setQuantity(response.data.quantity);
        setDescription(response.data.description);
        setSelectedGenres(response.data.Genres.map((genre) => genre.id));
      } catch (error) {
        console.error(error);
      }
    };
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
    fetchBook();
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
    const selectedGenreIds = selectedOptions.map((option) => option.value);
    setSelectedGenres(selectedGenreIds);
  };

  const updateBook = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !releaseDate ||
      !selectedAuthorId ||
      !selectedGenres ||
      !quantity ||
      !description
    ) {
      toast.error("Molimo vas da popunite sva polja.");
      return;
    }
    try {
      const { data } = await axios.put(
        `/api/knjiznica/knjige/updateBook/${id}`,
        {
          title: title,
          releaseDate: releaseDate,
          selectedAuthorId: selectedAuthorId,
          selectedGenres: selectedGenres,
          quantity: quantity,
          description: description,
        }
      );

      if (data.success) {
        toast.success("Book updated successfully");
        history.push("/knjiznica");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating book. Please try again.");
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const addAuthor = async (e) => {
    e.preventDefault();
    if (!authorName || !authorSurname || !authorBirthDate) {
      toast.error("Molimo vas da popunite sva polja.");
      return;
    }

    try {
      const { data } = await axios.post("/api/knjiznica/autori/addAuthor", {
        authorName: authorName,
        authorSurname: authorSurname,
        authorBirthDate: authorBirthDate,
      });

      if (data.success) {
        toast.success("Author added successfully");
        handleClosePopup();
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding author. Please try again.");
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={7} lg={5} xs={10}>
          <Card className="shadow" bg="light" border="dark">
            <Card.Body>
              <Card.Title className="text-center fs-1">
                Ažuriraj knjigu
              </Card.Title>
              <Form onSubmit={updateBook}>
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
                    value={formattedAuthors[parseInt(selectedAuthorId) - 1]}
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={handleAuthorSelect}
                  />
                  <Button size="sm m-1" onClick={handleOpenPopup}>
                    Dodaj novog autora
                  </Button>

                  {/* Pop-up forma */}
                  <Modal show={isPopupOpen} onHide={handleClosePopup}>
                    <Modal.Header closeButton>
                      <Modal.Title>Dodaj novog autora</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={addAuthor}>
                        <Form.Group
                          className="mb-2 fw-bold"
                          controlId="formBasicName"
                        >
                          <Form.Label>Ime autora</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Unesi ime autora"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-2 fw-bold"
                          controlId="formBasicName"
                        >
                          <Form.Label>Prezime autora</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Unesi prezime autora"
                            value={authorSurname}
                            onChange={(e) => setAuthorSurname(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-2 fw-bold d-flex flex-column"
                          controlId="formBasicName"
                        >
                          <Form.Label>Datum rođenja</Form.Label>
                          <DatePicker
                            selected={authorBirthDate}
                            onChange={(date) => setAuthorBirthDate(date)}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={addAuthor}>
                        Dodaj
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
                    value={selectedGenres.map((genreId) =>
                      formattedGenres.find((g) => g.value === genreId)
                    )}
                    onChange={handleGenresSelect}
                  />
                </Form.Group>
                <Form.Group className="mb-2 fw-bold" controlId="formBasicName">
                  <Form.Label>Količina</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Unesi količinu knjige"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2 fw-bold" controlId="formBasicName">
                  <Form.Label>Opis knjige</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Unesi opis knjige"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="fw-bold fs-5"
                >
                  Ažuriraj knjigu
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateBook;
