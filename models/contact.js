const { DataTypes } = require('sequelize');

const Contact = (sequelize) =>{
    const ContactModel = sequelize.define("contact", {
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
    });
    return ContactModel;
}
//lors de la creation 3 autres colonnes vont etre generer id, created and updated at
module.exports = Contact;
