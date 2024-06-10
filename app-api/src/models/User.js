module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        mail: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        timestamps: true
    });
    User.associate = function(models) {
        User.hasMany(models.Devi, { foreignKey: 'userId', as: 'devis' });
    };
    console.log("modèle User: ", User);
    return User;
}