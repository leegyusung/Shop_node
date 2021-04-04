const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const wishList = require('../models/wishlist');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const result = await wishList.create({
            wishListAmount: req.body.amount,
            wishUserId: req.body.userId,
            wishListProductId: req.body.productId,
            created_at: new Date(),
        })
        res.render('product');
    } catch (error) {
        console.error(error);
        next(error);
    }
})


module.exports = router;