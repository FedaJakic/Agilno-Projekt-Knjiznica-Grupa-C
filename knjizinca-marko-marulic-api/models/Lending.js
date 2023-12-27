import sequelize from '../config.js';
import { DataTypes } from 'sequelize';

export const Lending = sequelize.define('Lending', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Book',
      key: 'id',
    },
  },
  lent_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'lendings',
  timestamps: false,
});

