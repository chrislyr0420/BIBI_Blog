const crypto = require('crypto')

// key
const SECRET_KEY = 'WJiol_8776#'

// md5 encryption
const md5 = (content) => {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// encrypt function
const genPassword = (password) => {
    const str = `password =${password}&key=${SECRET_KEY}`
    
    return md5(str)
}

module.exports = {
    genPassword
}