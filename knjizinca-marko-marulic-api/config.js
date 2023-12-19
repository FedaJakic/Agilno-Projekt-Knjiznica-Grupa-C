
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'knjiznica',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;