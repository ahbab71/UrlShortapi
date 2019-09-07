const Sequelize = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE || 'postgres://urlshort:123456@localhost:5432/urls'

const db = new Sequelize(CONNECTION_STRING);

const Users = db.define('users',{
    name:Sequelize.TEXT,
    email:{
        type: Sequelize.TEXT,
        unique: true
    },
    password:Sequelize.TEXT
})

const ShortLink = db.define('direction',{
    direction:Sequelize.TEXT,
    hash:Sequelize.TEXT,
})

module.exports = {
    db, Users, ShortLink
}

