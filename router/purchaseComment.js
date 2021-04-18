const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const PurChaseComment = require('../models/purChaseComment');
const Product = require('../models/product');

const router = express.Router();

router.get('/',isLoggedIn,async(req,res,next)=>{
    try {
        const result =await PurChaseComment.findAll({
            attributes: ['purChaseId']
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})


router.post('/', isLoggedIn, async (req, res, next) => {
    const proId = req.body.proId;
    try {
        const result = await PurChaseComment.create({
            userId: req.body.userId,
            purChaseId: req.body.purId,
            productId: req.body.proId,
            purChaseCommentPost: req.body.purPost,
            purChaseComment: req.body.purComment,
        })
        const result2 = await PurChaseComment.count({
            where: { productId: proId }
        })
        const result3 = await PurChaseComment.sum(
            'purChaseCommentPost', { where: { productId: proId } }
        )
        var result4 = (result3 / result2).toFixed(1);
        var result4_arr = result4.split('.');
        console.log(result4);
        console.log(result4_arr[1])
        if (parseInt(result4_arr[1]) <= 4) {
            var temp=result4_arr[1] = 0;
            var result6= result4_arr[0] + '.' + temp;
        }
        if (parseInt(result4_arr[1]) >= 5) {
            var temp=result4_arr[1] = 5;
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