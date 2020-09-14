const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const userLogin = (username, password) => {
    username = escape(username)
    password = escape(genPassword(password))

    let sql = `
        select username, realname from users where username=${username} and password=${password}
    `

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    userLogin
}