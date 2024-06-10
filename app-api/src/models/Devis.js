module.exports = (sequelize, DataTypes) => {
    // Définition du modèle Article
    const Devi = sequelize.define('Devi', {
        eventType: DataTypes.STRING,
        service: DataTypes.STRING,
        numberOfGuests: DataTypes.INTEGER,
        date: DataTypes.DATE,
        totalAmount: DataTypes.FLOAT,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });
    Devi.associate = function(models) {
        // associations can be defined here
        Devi.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
    return Devi;
};