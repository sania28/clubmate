const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY;

async function handleGenerateToken(name,email) {
    const token = await jwt.sign({
        name,email
    },secret,{expiresIn:3600})//1h

    return token
}
module.exports ={
    handleGenerateToken
}