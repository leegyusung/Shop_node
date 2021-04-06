const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const WishList = require('../models/wishlist');
const PurChaseList = require('../models/purchaselist');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    const type = req.body.type;
    try {
        if (type == 0) {
            const result = await PurChaseList.create({
                purchaseAmount: req.body.amount,
                purchaseTotal: req.body.price,
                created_at: new Date(),
                purChaseProductId: req.body.productId,
                purChaseUserId: req.body.userId
            })
            const result2 = await User.update({
                money: req.body.money - req.body.price,
            }, {
                where: { id: req.body.userId }
            })
            const result3 = await Product.update({
                proAmount: req.body.curAmount - req.body.amount,
            }, {
                where: { id: req.body.productId }
            })
            res.render('product');
        }
        if (type == 1) {
            const result = await PurChaseList.create({
                purchaseAmount: req.body.amount,
                purchaseTotal: req.body.price,
                created_at: new Date(),
                purChaseProductId: req.body.productId,
                purChaseUserId: req.body.userId
            })
            const result2 = await User.update({
                money: req.body.money - req.body.price,
            }, {
                where: { id: req.body.userId }
            })
            const result3 = await Product.update({
                proAmount: req.body.curAmount - req.body.amount,
            }, {
                where: { id: req.body.productId }
            })
            const result4 = await WishList.destroy({
                where: { id: req.body.wishlistId }
            })
            res.render('wishlist');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
})


module.exports = router;