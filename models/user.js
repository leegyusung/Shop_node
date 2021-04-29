const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            money: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 10000000,
            }
        },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            })
    }
    static associate(db) {
        db.User.hasMany(db.Comment, { foreignkey: 'commenter', sourceKey: 'id' });
        db.User.hasMany(db.Wishlist, { foreignkey: 'wishUserId', sourceKey: 'id' });
        db.User.hasMany(db.Purchaselist, { foreignkey: 'purChaseUserId', sourceKey: 'id' });
        db.User.hasMany(db.PurChaseComment, { foreignkey: 'purChaseCommentUserId', sourceKey: 'id' });
    }
}