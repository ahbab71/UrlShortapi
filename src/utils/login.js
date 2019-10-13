const router        = require('express').Router();
//const { Users }   = require('../database');
const { Users }     = require('../db');
const _p            = require('../promise_errors');
const jwt           = require('jsonwebtoken');
const { check }     = require('express-validator/check');
const { generate, validate }  = require('./password');
const { app_secret } = require('../config.json');
const rejectInvalid  = require('../middlewares/reject_invalide')

const loginValidate = [
    check('email').isEmail(),check('password').isLength({ min: 5 })
];

router.post('/login', loginValidate, rejectInvalid, async (req,res,next)=>{
    
    let { password, email} = req.body;
    let [uer, user] = await _p(Users.findOne({
        where:{
            email 
        }
    }));
    
    if (uer && !user) {
            return next(uer);
        }
        else {
            //console.log(password);
            
            let [salt, hash] = user.password.split(".");
            let {name,email,id} = user;
            let valid = validate(password, hash, salt);
            if (valid) {
               let token = jwt.sign({id,name,email}, app_secret);
                res.json({
                    error: false,
                    token,
                    user: {
                        id, name, email
                    }
                });
            }
            else{
                 next(new Error('Password Incorrect'))
                
            }
        };
 
});

module.exports = router;

