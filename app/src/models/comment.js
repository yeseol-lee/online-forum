module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        writer: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        article_num: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
        
    }, { timestamps: false, });
};