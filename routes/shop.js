const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// The default response middleware
router.get('/', productsController.getProducts);

module.exports = router;