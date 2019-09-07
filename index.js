const express = require('express');
const bd      = require('body-parser');

const app     = express();

const _port = process.env.PORT || 4000;



app.listen(_port,()=>{
    console.log(`Application run listen port: ${_port}`)
});

