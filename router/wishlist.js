const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const wishList = require('../models/wishlist');
const purchaseList=require('../models/purchaselist');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const result = await wishList.create({
            wishListAmount: req.body.amount,
            wishListTotal: req.body.price,
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
router.post('/update', isLoggedIn, async (req, res, next) => {
    try {
        const result = wishList.update({
            wishListAmount: req.body.wishAmount,
            wishListTotal: req.body.wistTotal,
        }, {
            where: { id: req.body.wishListId },
        }
        )
        res.render('wishList');
    } catch (error) {
        console.error(error);
        next(error);
    }
})


module.exports = router;