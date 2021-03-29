const e = require('express');
const express = require('express');
const Product = require('../models/product');

const router = express.Router();


router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Product.findOne({
            where: { id }
        })
        res.render('product',{ result });
    } catch (error) {
        console.error(error);
        next(error);
    }
})


module.exports = router;