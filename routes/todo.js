const express = require('express');
const router = express.Router();
const pool = require('../database')

// content 내용 검색
router.get('/', async(req, res, next) => {
  try{
    const {content} = req.query;
    let sql = 'select * from todotable where 1';  // where 1은 항상 참이라 없어도 되는 구문. 동적으로 조건을 설정할 때 자주 씀.
    let values = [];

    if (content) {
      sql += ' and content like ?';
      values.push(`%${content}%`)
    } else {
      return res.status(204).end();
    }

    const [rows] = await pool.query(sql, values);

    if (rows.length === 0){
      return res.status(204).end();
    }

    res.json(rows);

  } catch (err){
    console.error(err);
    res.status(500)
  }
});

router.post('/', async(req, res) => {
  try{
    let {content} = req.body;
    console.log(content);
    const connection = await pool.getConnection(); // 데이터를 변경하거나 추가할 때만 db와의 연결을 설정함
    const [rows] = await pool.query('insert into todotable (content) values(?)',[content]); 
    res.status(200).json({ result : rows }); 
    connection.release(); 
  } catch (err){
    console.error(err);
  }
});

router.patch('/', async(req, res, next) => {
  try {
    const {idx, content} = req.body;

    if (!idx || !content){
      return res.status(400).json({error: "idx와 content 값을 확인해 주세요."})
    }

    const [result] = await pool.query('update todotable set content = ? where idx = ?', [content, idx]);

    if (result.affectedRows === 0) { // affectedRows는 SQL 쿼리로 데이터베이스를 변경한 후 영향을 받은 행의 수를 나타내는 속성
      return res.status(404).json({ error: '존재하지 않는 id입니다.' });
    }

    res.status(200).json({ message: '업데이트 되었습니다.' });

  } catch (err) {
    console.error(err);
  }
});

router.delete('/:idx', async(req, res, next) => {
try {
  const idx = req.params.idx;

  if(isNaN(idx)){
    return res.status(400).json({error: 'idx 값을 확인해 주세요.'})
  }

   // 해당 idx의 todo를 삭제하는 SQL 쿼리 실행
   const [result] = await pool.query('delete from todotable where idx = ?', [idx]);

   // 영향을 받은 행의 수가 0인 경우에는 해당하는 todo가 존재하지 않는다고 가정하고 에러 반환
   if (result.affectedRows === 0) {
     return res.status(404).json({ error: '존재하지 않는 값입니다.' });
   }

   res.status(200).json({ message: '삭제되었습니다.' });
  
} catch (err) {
  console.error(err);
}
});

module.exports = router;
