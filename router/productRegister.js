const express = require('express');
const multer = require('multer');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const fs = require('fs');
const path = require('path');
const Product = require('../models/product');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fieldSize: 5 * 253 * 250 },
});


router.get('/', isLoggedIn, (req, res, next) => {
    res.render('productRegister');
});

router.post('/', upload.single('image'), isLoggedIn, async (req, res, next) => {
    try {
        await Product.create({
            proType: req.body.type,
            proName: req.body.name,
            proPhoto: '/' + req.file.filename,
            proPrice: req.body.price,
            proAmount: req.body.amount,
            proContent: req.body.content,
        })
        res.redirect('/productRegister');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;