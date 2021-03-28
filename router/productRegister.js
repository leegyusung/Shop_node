const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path=require('path');

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


router.get('/', (req, res, next) => {
    res.render('productRegister');
})
router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file, req.body);
    next();
})
module.exports = router;