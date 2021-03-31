const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const productId = req.body.productId;
    const comment = req.body.comment;
    const commenter = req.body.commenter;
    try {
        const result = await Comment.create({
            productId: productId,
            comment: comment,
            commenter: commenter
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;