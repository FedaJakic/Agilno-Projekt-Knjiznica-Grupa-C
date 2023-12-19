import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

export const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Role, 
        key: 'id',
      },
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });