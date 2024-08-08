const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');

// The default response middleware
router.get('/', (req, res, next) => {
  console.log(adminData.products);
  const products = adminData.products;
  //sends a pug file, we only write shop cause the root folder is already declared in app.js
  // we pass data to the template
  res.render('shop', { prods: products, docTitle: 'Shop' });
});

module.exports = router;