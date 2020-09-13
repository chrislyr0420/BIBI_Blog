const mysql = require('mysql')

// create an object
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'liyiran0420',
    port: '3306',
    database: 'myblog'
})

// start connect
con.connect()

// execute sql
const sql = `update users set realname='李四2' where username='lisi';`
// const sql = 'select id, username from users;'
con.query(sql, (err, result) => {
    const promise = new Promise((resolve, reject) => {
        if (err) {
            reject(err)
            return
        }
        resolve(result)
    })
    return promise
})

con.end()