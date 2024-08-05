const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
});

//same as app.use() but only trigger for post requests.
router.post('/product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;