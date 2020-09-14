var express = require('express');
var router = express.Router();
const { userLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
    const { username, password } = req.body

    const result = userLogin(username, password)
    result.then(data => {
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            // do not need to sync with redis here since express has it's own way to sync with redis
            // set(req.sessionId, req.session)
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel('Login failed'))
        }
    })
})

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            error: 0,
            msg: 'already login'
        })
    } else {
        res.json({
            errno: -1,
            msg: 'not login'
        })
    }
})

module.exports = router;