const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY;

async function handleGenerateToken(name,email,role,_id) {
    const token = await jwt.sign({
        name,email,role,_id
    },secret,{expiresIn:3600})//1h

    return token
}
async function handleDecodeToken(token) {
    const decodedata = await jwt.decode(token)
    return decodedata;
}
module.exports ={
    handleGenerateToken,
    handleDecodeToken
}