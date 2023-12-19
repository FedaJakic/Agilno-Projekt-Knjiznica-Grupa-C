import sequelize from './config.js';

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

export { sequelize, testConnection, syncDatabase };
