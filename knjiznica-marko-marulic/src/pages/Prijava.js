import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Prijava = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prijavljeni ste!", email, password);
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col
          xs={12}
          md={6}
        >
          <Form
            className='d-flex flex-column justify-content-center align-items-center'
            onSubmit={handleSubmit}
          >
            <Form.Group
              className='my-5'
              controlId='formBasicEmail'
            >
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                type='email'
                placeholder='Unesite email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className='mb-5'
              controlId='formBasicPassword'
            >
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type='password'
                placeholder='Unesite lozinku'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className='mb-3'
              variant='primary'
              type='submit'
            >
              Prijavi se
            </Button>

            <Form.Text className='text-muted'>
              <p>
                {`Ukoliko nemate registriran profil, `}
                <Link to='/registracija'>{`registrirajte se ovdje`}</Link>.
              </p>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Prijava;
