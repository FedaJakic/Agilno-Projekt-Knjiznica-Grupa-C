import sequelize from '../config.js';
import { DataTypes } from 'sequelize';

export const Membership = sequelize.define('Membership', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subscription_start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  subscription_end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  book_limit: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.NUMERIC,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
}, {
  tableName: 'memberships',
  timestamps: false,
});

