const express = require('express');
const Product = require('../models/product');

const router = express.Router();


router.get('/', async(req, res, next) => {
    console.log('규성이');
    try {
        const result = await Product.findAll({
            where: { proType: 'top' }
        })
        console.log(result[0].id);
        res.render('productsList', { result });
    } catch (error) {
        console.error(error);
        next(error);
    }
   
})

module.exports = router;