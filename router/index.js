const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const WishList = require('../models/wishlist');
const PurChaseList = require('../models/purchaselist');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.get('/', async (req, res, next) => {
    try {
        const result = await Product.findAll({})

        var proPost = "proPost";
        result.sort(function (a, b) {
            return b[proPost] - a[proPost];
        })
        const result1 = result.slice(0, 3);
        res.render('main', { result: result1 });
    } catch (error) {
        console.error(error);
        next(error);
    }
})
router.get('/update', (req, res, next) => {
    res.render('update');
})
router.get('/userSidebar', isLoggedIn, (req, res, next) => {
    res.render('userSideBar');
})
router.get('/userSidebar/:id', isLoggedIn, async (req, res, next) => {
    const Id = req.params.id;
    console.log(Id);
    try {
        if (Id == 0) {
            const result2 = await WishList.findAll({
                where: { wishUserId: req.user.id },
                include: [{
                    model: Product,
                }],
            });
            var result = new Array();
            for (var i = 0; i < 6; i++) {
                if (result2[i] != undefined) {
                    result.push(result2[i]);
                }
            }
            if (result.length == 0) {
                res.render('wishList', {
                    result,
                    dataFlag: 'true'
                });
            } else {
                res.render('wishList', {
                    result,
                    userFlag: 'true'
                });
            }
        }
        if (Id == 1) {
            const result2 = await PurChaseList.findAll({
                where: { purChaseUserId: req.user.id },
                include: [{
                    model: Product,
                }],
            });
            var result = new Array();
            for (var i = 0; i < 6; i++) {
                if (result2[i] != undefined) {
                    result.push(result2[i]);
                }
            }
            if (result.length == 0) {
                res.render('purchaseList', {
                    result,
                    dataFlag: 'true'
                });
            } else {
                res.render('purchaseList', {
                    result,
                    userFlag: 'true'
                });
            }
        }
        if (Id == 2) {
            console.log(Id);
            res.render('purChasePost');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// router.get('/userSidebar/:id/purPost', isLoggedIn,  (req, res, next) => {
//    res.render('purChasePost');
// })

router.get('/adminSidebar', isLoggedIn, (req, res, next) => {
    res.render('adminSideBar');
})

router.get('/adminSidebar/:id', isLoggedIn, async (req, res, next) => {
    const Id = req.params.id;
    try {
        if (Id == 0) {
            const result2 = await User.findAll({});
            var result = new Array();
            for (var i = 0; i < 6; i++) {
                if (result2[i] != undefined) {
                    result.push(result2[i]);
                }
            }
            if (result.length == 0) {
                res.render('userlist', {
                    result,
                    dataFlag: 'true'
                });
            } else {
                res.render('userlist', {
                    result,
                    userFlag: 'true'
                });
            }
        }
        if (Id == 1) {
            const result = await Product.findAll({});
            if (result.length == 0) {
                res.render('productAll', {
                    result,
                    dataFlag: 'true'
                });
            }
            else {
                res.render('productAll', {
                    result,
                    userFlag: 'true'
                });
            }
        }
        if (Id == 2) {
            const result = await PurChaseList.findAll({
                include: [{
                    all: true
                }],
            });
            if (result.length == 0) {
                res.render('purchaseManage', {
                    result,
                    dataFlag: 'true'
                });
            }
            else {
                res.render('purchaseManage', {
                    result,
                    userFlag: 'true'
                });
            }
        }
        if (Id == 3) {
            const result = await PurChaseList.findAll({
                include: [{
                    all: true
                }],
            });

            res.render('adminChart', result);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/adminSidebar/page/:id/:page', async (req, res, next) => {
    const page = req.params.page;
    console.log(req.params.id);
    try {
        if (req.params.id == 0) {
            const result2 = await User.findAll({
            })
            var result = new Array();
            for (var i = 0; i < result2.length; i++) {
                if (i >= page * 6 - 6 && i < page * 6) {
                    result.push(result2[i]);
                }
            }
        }
        if (req.params.id == 1) {
            const result2 = await Product.findAll({
            })
            var result = new Array();
            for (var i = 0; i < result2.length; i++) {
                if (i >= page * 6 - 6 && i < page * 6) {
                    result.push(result2[i]);
                }
            }
        }
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/adminSidebar/userlist/:deleteUser', isLoggedIn, async (req, res, next) => {
    const deleteUser = req.params.deleteUser;
    try {
        const result = await User.destroy({
            where: { id: deleteUser }
        })
        res.render('userlist', { result });
    } catch (error) {
        console.error(error);
        next(error);
    }

});
router.get('/adminSidebar/productlist/:deleteProduct', isLoggedIn, async (req, res, next) => {
    const deleteProduct = req.params.deleteProduct;
    try {
        const result = await Product.destroy({
            where: { id: deleteProduct }
        })
        res.render('productAll', { result });
    } catch (error) {
        console.error(error);
        next(error);
    }

});

router.get('/userSidebar/wishlist/:deleteWishList', isLoggedIn, async (req, res, next) => {
    const deleteWishList = req.params.deleteWishList;
    try {
        const result = await WishList.destroy({
            where: { id: deleteWishList }
        })
        res.render('wishList', { result });
    } catch (error) {
        console.error(error);
        next(error);
    }

});

router.get('/adminSidebar/:id/json1', async (req, res, next) => {
    try {
        const result = await User.findAll({
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/adminSidebar/:id/json2', async (req, res, next) => {
    try {
        const result = await Product.findAll({
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/error', (req, res, next) => {
    res.render('error');
});


module.exports = router;