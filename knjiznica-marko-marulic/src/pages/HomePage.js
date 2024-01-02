import React from "react";
import HomeCarusel from "../components/HomeCarusel.js";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const HomeScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/knjiznica/knjige/getAllBooks");
        setBooks(response.data);
        console.log(books);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <HomeCarusel />
      <Container
        style={{
          height: "600px",
          overflowY: "scroll",
        }}
      >
        <h1 className="text-center">Knjige</h1>
        <p className="fw-bold fs-2 m-1" style={{ color: "#ffe6a7" }}>
          <Link to="/addBook">
            <Button variant="primary" className="m-2">
              Dodaj knjigu+
            </Button>
          </Link>
        </p>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Datum izdavanja</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <Link
                    to={`/bookDetails/${book.id}`}
                    className="text-decoration-none text-dark "
                  >
                    {book.title}
                  </Link>
                </td>

                <td>{book.release_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default HomeScreen;
