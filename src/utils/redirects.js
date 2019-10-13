const router     = require('express').Router();
const { check }  = require('express-validator/check');
const { Direction } = require('../db');
const _p = require('../promise_errors')
const rejectInvalid = require('../middlewares/reject_invalide');


const entryValidator = [check('url').isURL()];

router.post('/api/v1/redirect', entryValidator, rejectInvalid, async (req,res,next)=>{
    let user_id     = req.user.id;
    let destination = req.body.url;
    let timestamp = Date.now() / 1000;

    let hash = parseInt(`${user_id}${timestamp}`);    

    let [creatErr, created] = await _p(Direction.create({
        user_id, destination, hash
    }));

    if (creatErr && !created) {
        next(creatErr);
    }else{
        res.json({
            message:"Direction Created Successfully",
            hash
        });
    }

});

router.get('/api/v1/redirect', async (req,res,next)=>{
    let [dberr, myDirection] = await _p(Direction.findAll({
        where:{
            'user_id':req.body.id
        }
    }));
    if (dberr) return next(dberr);
    return res.json(myDirections.map(d => { return { hash: d.hash, destination: d.destination, id: d.id }}));
        

});






module.exports = router;

