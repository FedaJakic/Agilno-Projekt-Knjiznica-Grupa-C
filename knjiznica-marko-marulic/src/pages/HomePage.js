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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     const { data } = await axios.delete(`/api/knjiznica/knjige/books/${id}`);

  //     if (data.error) {
  //       alert(data.error);
  //     } else {
  //       window.location.reload();
  //       alert("Successful Delete");
  //     }
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       alert(error.message);
  //     }
  //   }
  // };

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
                <td className="d-flex">
                  <Link
                    to={`/bookDetails/${book.id}`}
                    className="text-decoration-none text-dark flex-grow-1"
                  >
                    {book.title}
                  </Link>
                  <Button variant="info" size="sm" className="m-1 ">
                    Uredi
                  </Button>
                  <Button
                    size="sm"
                    className="m-1"
                    // onClick={() => handleDelete(book.id)}
                  >
                    Izbriši
                  </Button>
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
