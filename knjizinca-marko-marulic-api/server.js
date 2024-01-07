import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './controllers/productRoutes.js';
import loginAndRegister from './controllers/loginAndRegister.js';
import bookRoutes from './controllers/bookRoutes.js';
import authorRoutes from './controllers/authorRoutes.js';
import bodyParser from 'body-parser';
import reservationRoutes from './controllers/reservationRoutes.js';
import userRoutes from './controllers/userRoutes.js';
import rolesRoutes from './controllers/rolesRoutes.js';
import membershipsRoutes from './controllers/membershipsRoutes.js';
import { testConnection, syncDatabase } from './db.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cors({
		origin: 'http://localhost:3000', // Zamijenite sa stvarnom domenom vašeg klijenta
		credentials: true,
		optionSuccessStatus: 200,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
const ENVIROMENT = process.env.NODE_ENV || 'development';

testConnection();

const startServer = async () => {
	try {
		await syncDatabase();

		app.listen(PORT, () => {
			console.log(`Server is running in ${ENVIROMENT} mode on port ${PORT}`);
		});
	} catch (error) {
		console.error('Error syncing database:', error);
	}
};

await startServer();

app.use('/api', loginAndRegister);
app.use('/api/knjiznica', productRoutes);
app.use('/api/knjiznica/knjige', bookRoutes);
app.use('/api/knjiznica/autori', authorRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/memberships', membershipsRoutes);
