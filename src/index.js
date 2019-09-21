const express    = require('express');
const bp = require('body-parser');
const signup     = require('./utils/signup');

const app        = express();

app.use(bp.json());

 app.use(signup);





// Database connection

const _port = process.env.PORT || 3000;

app.listen(_port,()=>{
    console.log(`Application run listen port: ${_port}`)
});

