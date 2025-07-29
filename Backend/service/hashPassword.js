const bcrypt = require('bcrypt')

async function handleHashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password,salt)
    return hashpassword
}
async function handleDecordPassword(hashpassword, password) {
    const isvalidPassword = await bcrypt.compare(password,hashpassword)
    return isvalidPassword;
}
module.exports = {
    handleHashPassword,
    handleDecordPassword
}