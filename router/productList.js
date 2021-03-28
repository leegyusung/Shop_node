const express = require('express');
const Product = require('../models/product');
const path=require('path');

const router = express.Router();



router.get('/:id', async (req, res, next) => {
    const type = req.params.id;
    try {
        const result = await Product.findAll({
            where: { proType: type }
        })
        console.log(result);
        
        res.render('productsList', { result, type: type });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;