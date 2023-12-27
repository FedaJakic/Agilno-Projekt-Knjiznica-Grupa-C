import sequelize from '../config.js';
import { DataTypes } from 'sequelize';

export const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'genres',
    timestamps: false,
});


