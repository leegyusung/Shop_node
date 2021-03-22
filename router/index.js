const express = require('express');

const router=express.Router();

router.use((req,res,next)=>{
    res.locals.user=req.user;
    next();
})

router.get('/', (req, res, next) => {
    res.render('main', { title: 'Main' });
})

module.exports=router;