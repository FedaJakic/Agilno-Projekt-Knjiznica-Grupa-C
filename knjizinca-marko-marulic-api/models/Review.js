import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

export const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id_fk: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Book', 
        key: 'id',
      },
    },
    user_id_fk: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', 
          key: 'id',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    review_text: {
        type: DataTypes.TEXT,
    },
    review_date: {
        type: DataTypes.DATE,
    },
  }, {
    tableName: 'review',
    timestamps: false,
  });