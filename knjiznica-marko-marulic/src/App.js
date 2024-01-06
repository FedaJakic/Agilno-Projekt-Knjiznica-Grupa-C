import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import MyProfile from "./pages/MyProfile";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ProfileEdit from "./pages/ProfileEdit";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/prijava" component={Prijava} exact />
          <Route path="/registracija" component={Registracija} exact />
          <Route path="/profil" component={MyProfile} exact />
          <Route path="/profil-edit" component={ProfileEdit} exact />
          <Route path="/bookDetails/:id" component={BookDetails} exact />
          <Route path="/updateBook/:id" component={UpdateBook} exact />
          <Route path="/addBook" component={AddBook} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
