const express = require('express');
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const e = require('express');


const router = express.Router();


router.post('/', isNotLoggedIn, async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 12);
    try {
        const result = await User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
        })

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.post('/:userId', isLoggedIn, async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const result = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!result) {

        }
        console.log(result);
        return res.render('update', { user: result });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put('/update', isLoggedIn, async (req, res, next) => {
    const userId=req.body.userId;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        await User.update({
            email: email,
            password: password,
            name: name,
        }, {
            where: { id: userId },
        });
        return res.render('main');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;