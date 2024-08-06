const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();

// The default response middleware
router.get('/', (req, res, next) => {
  //sends any response
  res.sendFile(path.join(rootDir, 'views', 'shop.html')); 
});

module.exports = router;