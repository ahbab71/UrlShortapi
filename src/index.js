const express    = require('express');
const bp = require('body-parser');
const signup     = require('./utils/signup');
const login     = require('./utils/login');
const red = require('./utils/redirects');
const auth     = require('./middlewares/auth') 
const cors = require('./middlewares/cors') 
const errh     = require('./middlewares/error_handler')


const app        = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// Middelwares
app.use(cors)
app.use('/api',auth);

 app.use(signup);
app.use(login);
app.use(red);

app.use(errh);

// Database connection

const _port = process.env.PORT || 3000;

app.listen(_port,()=>{
    console.log(`Application run listen port: ${_port}`)
});

