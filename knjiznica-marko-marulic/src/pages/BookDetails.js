import React from "react";
import { Row, Col, Container, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/knjiznica/knjige/books/${id}`);
        setBook(response.data);
        console.log(book);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, []);
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={4} xs={12}>
            <Card className="shadow" border="dark">
              <Card.Body>
                <Card.Title className="text-center fs-2">
                  {book.title}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="  p-1">
                  {book.release_date}
                </ListGroup.Item>
                {/* <ListGroup.Item className="  p-1">
                  {book.Author.first_name + " " + book.Author.last_name}
                </ListGroup.Item> */}
              </ListGroup>
              <Card.Text className="p-2 d-flex text-dark">
                Opis knjige
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookDetails;
