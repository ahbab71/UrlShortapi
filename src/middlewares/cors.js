module.exports = function (req,res,next){
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}