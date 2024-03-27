const express = require('express');
const router = express.Router();

// query string
router.get('/', function(req, res, next) {
  res.send(
    `입력한 query string: ${req.query.name}`
  );
});

module.exports = router;
