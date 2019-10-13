const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;


// DB connection

mongoose.connect('mongodb://localhost/url_database', { useNewUrlParser: true });



let TestSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
        
    },
    password: { type: String, required: true }
});

const Direction = new Schema({
    user_id: Number,
    destination:String,
    hash:String
})




const Users = mongoose.model('ahbab', TestSchema);






db.on('error', (err) => {
    console.log(err)
});

db.once('open', () => {
    console.log('database connect')
});

module.exports = {
    db, Users, Direction
}
