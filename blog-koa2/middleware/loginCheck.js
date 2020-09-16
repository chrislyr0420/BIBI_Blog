const { ErrorModel } = require('../model/resModel')

// return a function directly
module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
    } else {
        ctx.body(new ErrorModel('Please login'))
    }
}