const express = require('express');
const User=require('../models/user');
const Product = require('../models/product');
const Comment = require('../models/comment');

const router = express.Router();


router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Product.findOne({
            where: { id }
        });
        const commentResult = await Comment.findAll({
            include: [{
                model: User,
                attributes:['name']
            }],
            where: { productId: id }
        });
        res.render('product', { result, commentResult });
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;