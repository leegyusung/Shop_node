const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');


const indexRouter = require('./router');
const signRouter = require('./router/signin');
const loginRouter = require('./router/login');
const productRouter=require('./router/product');
const productsRouter = require('./router/productList');
const productRegisterRouter = require('./router/productRegister');
const commentRouter=require('./router/comment');
const wishlistRouter=require('./router/wishlist');
const purchaselistRouter=require('./router/purchase');
const purchaseCommentRouter=require('./router/purchaseComment');


dotenv.config();
const app = express();
passportConfig();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
}));
app.use(passport.initialize());
app.use(passport.session());
//Mysql 초기설정
sequelize.sync({ force: false })//force가 true 면 서버가 돌아갈때마다 테이블생성
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
//Mysql 초기설정

app.use('/', indexRouter);
app.use('/signin', signRouter);
app.use('/login', loginRouter);
app.use('/product',productRouter);
app.use('/productList', productsRouter);
app.use('/productRegister', productRegisterRouter);
app.use('/comment',commentRouter);
app.use('/wishlist',wishlistRouter);
app.use('/purchase',purchaselistRouter);
app.use('/purchaseComment',purchaseCommentRouter)


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '포트에서 사용중입니다');
})