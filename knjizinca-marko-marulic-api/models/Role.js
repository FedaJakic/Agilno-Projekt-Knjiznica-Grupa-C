import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

export const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});
