module.exports = (sequelize, DataTypes) => {
    return sequelize.define('article', {
        
        writer: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    }, { timestamps: false, });
};