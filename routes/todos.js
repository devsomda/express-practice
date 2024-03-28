const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/', async(req, res, next) => {
  try{
    const connection = await pool.getConnection();
    const sql = 'select * from todotable';
    const [rows] = await pool.query(sql);
    res.status(200).json({ result : rows });
    connection.release();
  } catch (error){
    console.log(error);
  }
});

module.exports = router;
