const mysql = require('mysql2/promise');  //promise를 쓰는 이유는 에러발생 시, 에러를 잡기 위해
const dotenv = require('dotenv');
dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const dbConfig = {
  connectionLimit : 10,
  host : DB_HOST,
  user : DB_USER,
  password : DB_PASSWORD,
  database : DB_DATABASE
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;