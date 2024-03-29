import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { toast } from 'react-hot-toast';

const Prijava = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pokusavate se prijaviti!", email, password);

    if (!email || !password) {
      console.log("Email or Password cannot be empty!");
      return;
    }

    fetch("http://localhost:5000/api/prijava", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then((resp)=>{
      if (!resp.ok) throw new Error("Unijeli ste krive podatke!");
      else return resp.json()
    })
    .then((data)=>{
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.user_id);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("firstName", data.data.first_name);
      console.log("Uspijesno prijavljeni!");
      window.location.href = '/';
    })
    .catch((err)=> {
      console.log(err.message);
      toast.error(err.message);
    });
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
