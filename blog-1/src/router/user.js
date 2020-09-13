const { userLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouters = (req, res) => {
    // login router
    if (req.method === 'POST' && req.path === '/api/user/login') {
    
        const { username, password } = req.body
        return userLogin(username, password).then(data => {
            if (data.username) {
                req.session.username = data.username
                req.session.realname = data.realname
                
                set(req.sessionId, req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('Login failed')
            }
        })
    }

    // if (req.method === 'GET' && req.path === '/api/user/login-test') {
    //     console.log('req.session.username is :', req.session.username)
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             }))
    //     } else {
    //         return Promise.resolve(new ErrorModel('not login at all'))
    //     }
    // }
}

module.exports = handleUserRouters