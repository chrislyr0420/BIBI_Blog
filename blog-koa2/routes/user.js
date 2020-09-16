const router = require('koa-router')()
const { userLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const loginResult = await userLogin(username, password)

  if (loginResult.username) {
    ctx.session.username = loginResult.username
    ctx.session.realname = loginResult.realname
    ctx.body = new SuccessModel
  } else {
    ctx.body = new ErrorModel('Login failed')
  }
})

router.get('/session-test', async function (ctx, next) {
  if (ctx.session.viewCount == null) {
      ctx.session.viewCount = 0
  }
  ctx.session.viewCount++

  ctx.body = {
      errno: 0,
      viewCount: ctx.session.viewCount
  }
})

module.exports = router
