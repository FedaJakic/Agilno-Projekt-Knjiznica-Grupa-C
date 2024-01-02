import React from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddBook = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState([]);

  const options = [
    { value: "akcija", label: "Akcija" },
    { value: "komedija", label: "Komedija" },
    { value: "romantika", label: "Romantika" },
  ];
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
                  <Form.Control
                    type="text"
                    placeholder="Unesi autora"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
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
