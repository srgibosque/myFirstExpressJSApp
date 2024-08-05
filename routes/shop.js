const express = require('express');

const router = express.Router();

// The default response middleware
router.get('/', (req, res, next) => {
  //sends any response
  res.send('<h1>Hello from express</h1>');
});

module.exports = router;