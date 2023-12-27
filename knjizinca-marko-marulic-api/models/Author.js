import sequelize from '../config.js';
import { DataTypes } from 'sequelize';

export const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

