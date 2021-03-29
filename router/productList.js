const express = require('express');
const Product = require('../models/product');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const path = require('path');

const router = express.Router();



router.get('/:id', async (req, res, next) => {
    const type = req.params.id;
    try {
        const result = await Product.findAll({
            where: { proType: type }
        })
        res.render('productsList', { result, type: type });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;