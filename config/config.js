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
        username: "b9f9227b271696",
        password: "46188ad1",
        database: "heroku_f2f800283f14820",
        host: "us-cdbr-east-03.cleardb.com",
        dialect: "mysql"
    }
}