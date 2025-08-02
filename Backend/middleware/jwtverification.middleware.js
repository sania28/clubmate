const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY;

async function jwtValidation(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json({msg:'User must be login'})
    }
    const ValidToken = jwt.verify(token,secret)
    if(ValidToken==false){
        return res.status(401).json({msg:'Invalid User'})
    }
    next()
}
module.exports = {
    jwtValidation
}