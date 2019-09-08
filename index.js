const express = require('express');
const bp      = require('body-parser');
const signup  = require('./src/utils/signup');

const app     = express();

const app = use(bp.json());

const app = use(signup);





// Database conection

const _port = process.env.PORT || 4000;

app.listen(_port,()=>{
    console.log(`Application run listen port: ${_port}`)
});

