const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.get('/', async (req, res, next) => {
    try {
        const result = await Product.findAll({});
        res.render('main',{ result });
    } catch (error) {
        console.error(error);
        next(error);
    }

})
router.get('/update', (req, res, next) => {
    res.render('update');
})
router.get('/error', (req, res, next) => {
    res.render('error');
})


module.exports = router;