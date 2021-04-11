const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const wishList = require('../models/wishlist');
const Product=require('../models/product');
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

router.get('/page/:id/:page', async (req, res, next) => {
    const page = req.params.page;
    try {
        const result2 = await wishList.findAll({
            where: { wishUserId: req.params.id },
            include: [{
                model: Product,
            }],
        })
        var result = new Array();
        for (var i = 0; i < result2.length; i++) {
            if (i >= page * 6 - 6 && i < page * 6) {
                result.push(result2[i]);
            }
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/:id/json', async (req, res, next) => {
    try {
        const result = await wishList.findAll({
            where: { wishUserId:  req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;