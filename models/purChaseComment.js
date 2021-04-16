const Sequelize = require('sequelize');

module.exports = class PurChaseComment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            productId: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            purChaseCommentPost: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            purChaseComment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'PurChaseComment',
            tableName: 'purChaseComments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {

    }
};