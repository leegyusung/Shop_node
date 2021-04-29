require('dotenv').config();

module.exports = {
    development: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "Shop",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "Shop",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "be8aab0bdba387",
        password: "015e2c77",
        database: "Shop",
        host: "us-cdbr-east-03.cleardb.com",
        dialect: "mysql",
        //logging:false,
    }
   // mysql://be8aab0bdba387:015e2c77@us-cdbr-east-03.cleardb.com/heroku_5954aec46fd3766?reconnect=true
}