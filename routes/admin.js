const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

//same as app.use() but only trigger for post requests.
router.post('/add-product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;