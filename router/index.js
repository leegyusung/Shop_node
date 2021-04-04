const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const WishList = require('../models/wishlist');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.get('/', async (req, res, next) => {
    try {
        const result = await Product.findAll({});
        res.render('main', { result });
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
    try {
        if (Id == 0) {
            const result = await WishList.findAll({
                where: { wishUserId: req.user.id },
                include: [{
                    model: Product,
                }],
            });
            console.log(result);
            if (result.length == 0) {
                res.render('wishlist', {
                    result,
                    dataFlag: 'true'
                });
            } else {
                res.render('wishlist', {
                    result,
                    userFlag: 'true'
                });
            }
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});



router.get('/adminSidebar', isLoggedIn, (req, res, next) => {
    res.render('adminSideBar');
})

router.get('/adminSidebar/:id', isLoggedIn, async (req, res, next) => {
    const Id = req.params.id;
    try {
        if (Id == 0) {
            const result = await User.findAll({});
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
    } catch (error) {
        console.error(error);
        next(error);
    }
});
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
router.get('/sidebar/productlist/:deleteProduct', isLoggedIn, async (req, res, next) => {
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


router.get('/error', (req, res, next) => {
    res.render('error');
});


module.exports = router;