const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Product = require('./product');
const Wishlist = require('./wishlist');
const Purchaselist = require('./purchaselist');
const PurChaseComment = require('./purChaseComment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;
db.Product = Product;
db.Wishlist = Wishlist;
db.Purchaselist = Purchaselist;
db.PurChaseComment = PurChaseComment;

User.init(sequelize);
Comment.init(sequelize);
Product.init(sequelize);
Wishlist.init(sequelize);
Purchaselist.init(sequelize);
PurChaseComment.init(sequelize);

User.associate(db);
Comment.associate(db);
Product.associate(db);
Wishlist.associate(db);
Purchaselist.associate(db);
PurChaseComment.associate(db);

module.exports = db;