require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};
