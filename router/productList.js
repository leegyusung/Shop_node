const express = require('express');
const Product = require('../models/product');
const path = require('path');

const router = express.Router();



router.get('/:id', async (req, res, next) => {
    const type = req.params.id;
    try {
        const result2 = await Product.findAll({
            where: { proType: type }
        })
        var result = new Array();
        for (var i = 0; i < 4; i++) {
            if (result2[i] != undefined) {
                result.push(result2[i]);
            }
        }
        return res.render('productsList', { result, type: type });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/page/:id/:page', async (req, res, next) => {
    const type = req.params.id;
    const page = req.params.page;
    try {
        const result2 = await Product.findAll({
            where: { proType: type }
        })
        var result = new Array();
        for (var i = 0; i < result2.length; i++) {
            if (i >= page * 4 - 4 && i < page * 4) {
                result.push(result2[i]);
            }
        }
        res.json(result);
        // return res.render('productsList', { result, type: type });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.get('/:id/json', async (req, res, next) => {
    const type = req.params.id;
    try {
        const result = await Product.findAll({
            where: { proType: type }
        })
        res.json(result);
        //return res.render('productsList', { result, type: type });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;