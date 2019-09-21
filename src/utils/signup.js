const router                      = require('express').Router();
const { generate }                = require('./password');
const { Users }                   = require('../database');
const { check, validationResult } = require('express-validator');
const _p                          = require('../promise_errors')     


const signupValidate = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];

router.post('/signup', signupValidate, async (req, res,next)=>{
    const errors = (validationResult(req))
    if (!errors.isEmpty()) {
        return res
        .status(422)
        .json({ 
            errors: errors.array() 
        });
    }

    let passGenerate = generate(req.body.password);
    let password = `${passGenerate.salt}.${passGenerate.hash}`

    let {name,email} = req.body;

    let [ucErr, UserCreat] = await _p(Users.create({
        name,email,password
    }));
    if (ucErr && !UserCreat) {
        //return next(ucErr);
       res.status(400).json({ error: true, message: ucErr.message});
        
    }else{
       res.json({ error: false, message: "User created" });
    }
    
});



module.exports = router;
