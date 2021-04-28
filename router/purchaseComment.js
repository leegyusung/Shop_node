const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const PurChaseComment = require('../models/purChaseComment');
const Product = require('../models/product');

const router = express.Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const result = await PurChaseComment.findAll({
            attributes: ['purChaseId']
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/filter/:menu/:text', async (req, res, next) => {
    const text = '%' + req.params.text + '%';
    try {
        if (req.params.menu == 0) {
            console.log(0);
            const result = await PurChaseComment.findAll({})
            res.json(result);
        }
        if (req.params.menu == 1) {
            const result = await PurChaseComment.findAll({
                include: [{
                    model: Product,
                    where: {
                        proName: { [Op.like]: text }
                    },

                }],
            })
            res.json(result);
        }
        if (req.params.menu == 2) {
            const result = await PurChaseComment.findAll({
                where: {
                    purChaseUserName: { [Op.like]: text }
                },
                include: [{
                    model: Product,
                }],
            })
            res.json(result);
        }
        if (req.params.menu == 3) {
            const result = await PurChaseComment.findAll({
                include: [{
                    all: true
                }],
                where: { purChaseComment: { [Op.like]: text } },
            })
            res.json(result);
        }
    } catch (error) {

    }
})


router.post('/', isLoggedIn, async (req, res, next) => {
    const proId = req.body.proId;
    try {
        const result = await PurChaseComment.create({
            userId2: req.body.userId,
            purChaseId: req.body.purId,
            productId2: proId,
            purChaseUserName: req.body.userName,
            purChaseCommentPost: req.body.purPost,
            purChaseComment: req.body.purComment,
            purChaseCommentUserId: req.body.userId,
            purChaseCommentProductId: proId,
        })
        const result2 = await PurChaseComment.count({
            where: { productId2: proId }
        })
        const result3 = await PurChaseComment.sum(
            'purChaseCommentPost', { where: { productId2: proId } }
        )
        var result4 = (result3 / result2).toFixed(1);
        var result4_arr = result4.split('.');
        console.log(result4);
        console.log(result4_arr[1])
        if (parseInt(result4_arr[1]) <= 4) {
            var temp = result4_arr[1] = 0;
            var result6 = result4_arr[0] + '.' + temp;
        }
        if (parseInt(result4_arr[1]) >= 5) {
            var temp = result4_arr[1] = 5;
            var result6 = result4_arr[0] + '.' + temp;
        }
        const result5 = await Product.update({
            proPost: parseFloat(result6),
        }, {
            where: { id: proId }
        })
        res.render('purchaseList');
    } catch (error) {
        console.error(error);
        next(error);
    }
})



module.exports = router;