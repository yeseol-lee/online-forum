module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        pwd: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, { timestamps: false, });
};