const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            proType: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            proName: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            proPhoto: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            proPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            proAmount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            proContent: {
                type: Sequelize.STRING(400),
                allowNull: false,
            }
        },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Product',
                tableName: 'products',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            })
    }
    static associate(db) {
        db.Product.hasMany(db.Purchaselist, { foreignkey: 'purChaseProductId', sourceKey: 'id' });
        db.Product.hasMany(db.Wishlist, { foreignkey: 'wishListProductId', sourceKey: 'id' });
    }
}