const path = require('path');
const express = require('express');

const router = express.Router();

// The default response middleware
router.get('/', (req, res, next) => {
  //sends any response
  res.sendFile(path.join(__dirname,'../', 'views', 'shop.html')); 
});

module.exports = router;