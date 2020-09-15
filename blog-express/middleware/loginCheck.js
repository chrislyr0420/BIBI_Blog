const { ErrorModel } = require('../model/resModel')

// return a function directly
module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        res.json(new ErrorModel('Please login'))
    }
}