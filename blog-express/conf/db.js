const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'ads-db.ciwpg75rvkln.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: 'Liyiran0420!',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

if (env === 'prod') {
    MYSQL_CONF = {
        host: 'ads-db.ciwpg75rvkln.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: 'Liyiran0420!',
        port: '3306',
        database: 'myblog'
    }
    
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}