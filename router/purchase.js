const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const WishList = require('../models/wishlist');
const PurChaseList = require('../models/purchaselist');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await PurChaseList.findAll({
            include: [{
                model: Product,
            }],
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/chart2', async (req, res, next) => {
    try {
        const result = await PurChaseList.findAll({
            attributes: ['purchaseAmount', 'purchaseTotal', 'created_at']
        })
        for (var i = 0; i < result.length; i++) {
            result[i].created_at = date_to_str(result[i].created_at);
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/chart3/:userId', async (req, res, next) => {
    const userId=req.params.userId;
    try {
        const result = await PurChaseList.findAll({
            attributes: ['purchaseAmount', 'purChaseProductId'],
            where: {
                purChaseUserId: userId,
            },
            include: [{
                model: Product,
                attributes: ['proType'],
                where: {
                    id: 9,
                }
            }],
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
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
});
router.post('/purChaseStatus', async (req, res, next) => {
    try {
        const result = await PurChaseList.update({
            purChaseStatus: req.body.purStatus,
        }, {
            where: { id: req.body.purId }
        })
        console.log(result);
        res.render('purchaseManage', { result });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/json', async (req, res, next) => {
    try {
        const result = await PurChaseList.findAll({
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/:id/json', async (req, res, next) => {
    try {
        const result = await PurChaseList.findAll({
            where: { purChaseUserId: req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})
router.get('/page/:page', async (req, res, next) => {
    const page = req.params.page;
    try {
        const result2 = await PurChaseList.findAll({
            include: [{
                all: true,
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
});

router.get('/page/:id/:page', async (req, res, next) => {
    const page = req.params.page;
    try {
        const result2 = await PurChaseList.findAll({
            where: { purChaseUserId: req.params.id },
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
});
router.post('/purPost', async (req, res, next) => {
    console.log(req.body.purPost);
    try {
        const result = await PurChaseList.update({
            purChasePost: req.body.purPost,

        }, {
            where: { id: req.body.id }
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

function date_to_str(format) {
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    if (month < 10) month = '0' + month;
    var date = format.getDate();
    if (date < 10) date = '0' + date;
    var hour = format.getHours();
    if (hour < 10) hour = '0' + hour;
    var min = format.getMinutes();
    if (min < 10) min = '0' + min;
    var sec = format.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return year + "-" + month + "-" + date;
}

module.exports = router;