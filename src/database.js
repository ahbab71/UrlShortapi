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
    //user_id: Sequelize.NUMERIC,
    direction:Sequelize.TEXT,
    hash:Sequelize.TEXT,
})

db.sync({force:true})
    .then(e=>{
        console.log("Database Synced");
        
    }).catch(e=>{console.log(e.message)})

module.exports = {
    db, Users, ShortLink
}

