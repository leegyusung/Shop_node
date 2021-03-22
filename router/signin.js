const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');

const router = express.Router();


router.post('/', async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 12);
    try {
        const result = await User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
        })
       return res.status(200).json({ result: 'success' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;