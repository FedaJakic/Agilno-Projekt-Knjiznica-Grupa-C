import sequelize from '../config.js';
import { DataTypes } from 'sequelize';

export const BookGenre = sequelize.define('BookGenre', {
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Book', 
      key: 'id',
    },
  },
  genre_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Genre', 
      key: 'id',
    },
  },
}, {
  tableName: 'book_genres',
  timestamps: false,
  primaryKey: true,
});
