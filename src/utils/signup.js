const router         = require('express').Router();
const { generate }   = require('./password');
//const { Users }                   = require('../database');
const { Users }      = require('../db');
const { check }      = require('express-validator/check');
const _p             = require('../promise_errors')     
const rejectInvalid  = require('../middlewares/reject_invalide')

const signupValidate = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];

router.post('/signup', signupValidate, rejectInvalid, async (req, res,next)=>{
   

    let passGenerate = generate(req.body.password);
    let password = `${passGenerate.salt}.${passGenerate.hash}`

    let {name,email} = req.body;

    let [ucErr, UserCreat] = await _p(Users.create({
        name,email,password
    }));
    if (ucErr && !UserCreat) {
        return next(ucErr);
    }else{
       res.json({ error: false, message: "User created" });
    }
    
});



module.exports = router;
