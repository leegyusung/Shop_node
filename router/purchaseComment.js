const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const PurChaseComment = require('../models/purChaseComment');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const result = await PurChaseComment.create({
            userId: req.body.userId,
            productId: req.body.purId,
            purChaseCommentPost: req.body.purPost,
            purChaseComment: req.body.purComment,
        })
        res.render('purchaseList');
    } catch (error) {
        console.error(error);
        next(error);
    }
})



module.exports = router;