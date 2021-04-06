const Sequelize = require('sequelize');

module.exports = class Wishlist extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            wishListAmount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            wishListTotal: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            }
        },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Wishlist',
                tableName: 'wishlist',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            })
    }
    static associate(db) {
        db.Wishlist.belongsTo(db.User, { foreignKey: 'wishUserId', targetKey: 'id' });
        db.Wishlist.belongsTo(db.Product, { foreignKey: 'wishListProductId', targetKey: 'id' });
    }
}