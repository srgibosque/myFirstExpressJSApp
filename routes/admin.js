const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const { title } = require('process');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add product' });
});

//same as app.use() but only trigger for post requests.
router.post('/add-product', (req, res, next) => {
  // console.log(req.body);
  products.push({ title: req.body.title });

  res.redirect('/');
});

exports.routes = router;
exports.products = products;