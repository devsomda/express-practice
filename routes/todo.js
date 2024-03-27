const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/', function(req, res, next) {
  res.json({
    id:1,
    content: "할 일1",
    isDone: false,
    createdAt: "now",
  });
});

router.get('/:id', function(req, res, next) {
  res.json({
    id:req.params.id,
    content: "할 일1",
    isDone: false,
    createdAt: "now",
  });
});

router.post('/', async(req, res) => {
  try{
    let {content} = req.body;
    console.log(content);
    const connection = await pool.getConnection(); 
    let sql = 'insert into todotable (content) values(?)'; 
    let data = [content];
    console.log(data);
    const [rows] = await pool.query(sql,data); 
    res.status(200).json({ result : rows }); 
    connection.release(); 
  } catch (err){
    console.log(err);
  }
});

router.put('/:id', function(req, res, next) {
  res.json({
    id:req.params.id,
    content: "할 일1",
    isDone: false,
    createdAt: "now",
  });
});

router.delete('/:id', function(req, res, next) {
  res.send('delete!');
});

module.exports = router;
