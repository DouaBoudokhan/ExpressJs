const config = require('../config.json');
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize');
//sequelize nous aide a manipuler la db 

async function initialize(){
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    
    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql'});
    //se connecter a la db

    const models = {
        Contact: require('../models/contact')(sequelize)
        //on a ajouter le sequelize car dans notre model on a sequelize comme parametre il va nous aider pour la config des attributs et des tables
    }

    await sequelize.sync();
    //ajouter les models, les tables , les attributs dans la db

    return {
        sequelize,
        ...models
    }
}

module.exports = initialize;