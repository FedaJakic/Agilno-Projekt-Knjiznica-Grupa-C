import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Prijava from './pages/Prijava';
import Registracija from './pages/Registracija';
import MyProfile from './pages/MyProfile';
import ProfileEdit from './pages/ProfileEdit';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route
						path='/'
						component={HomePage}
						exact
					/>
					<Route
						path='/prijava'
						component={Prijava}
						exact
					/>
					<Route
						path='/registracija'
						component={Registracija}
						exact
					/>
					<Route
						path='/profil'
						component={MyProfile}
						exact
					/>
					<Route
						path='/profil-edit'
						component={ProfileEdit}
						exact
					/>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
