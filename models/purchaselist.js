const Sequelize = require('sequelize');

module.exports = class Purchaselist extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            purchaseAmount: {
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
                modelName: 'Purchaselist',
                tableName: 'purchaselist',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            })
    }
    static associate(db) {
        db.Purchaselist.belongsTo(db.Product, { foreignKey: 'purChaseProductId', targetKey: 'id' });
        db.Purchaselist.belongsTo(db.User, { foreignKey: 'purChaseUserId', targetKey: 'id' });
    }
}