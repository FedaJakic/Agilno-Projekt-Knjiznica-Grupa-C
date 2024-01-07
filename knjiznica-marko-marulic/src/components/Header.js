import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const Header = () => {
  function redirect() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("first_name");
    window.location.href = '/';
  }
  const firstName = localStorage.getItem("firstName") || undefined



  return (
    <header>
      <Navbar
        expand='lg'
        collapseOnSelect
        style={{
          backgroundColor: "rgb(118 119 121)",
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link
              className='header-brand-name'
              to='/'
            >
              Knjiznica Marko Marulic
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto d-flex align-items-center'>
              <Nav.Link
                href='/'
                style={{
                  color: "white",
                }}
              >
                <i className='fa-solid fa-home'></i> Početna
              </Nav.Link>
              <Nav.Link
                href='/prijava'
                style={{
                  color: "white",
                }}
              >
                Prijava
              </Nav.Link>
              <Nav.Link
                href='/registracija'
                style={{
                  color: "white",
                }}
              >
                Registracija
              </Nav.Link>
              <Nav.Link
                href='/profil'
                style={{
                  color: "white",
                }}
              >
               
                Profil 
                
                {firstName && (
                <span>- {firstName}</span>
              )}
             
              </Nav.Link>
              <Button
                onClick={redirect}
                variant='warning'
                size='sm'
                style={{
                  height: "40px",
                }}
              >
                Odjava
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
