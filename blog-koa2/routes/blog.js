const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    const query = ctx.query
    
    ctx.body = {
        errno: 0,
        query
    }
})

router.get('/detail', async (ctx, next) => {
    const query = ctx.query
    
    ctx.body = {
        errno: 0,
        query
    }
})

router.post('/create', async (ctx, next) => {
    const query = ctx.query
    
    ctx.body = {
        errno: 0,
        query
    }
})

router.post('/update', async (ctx, next) => {
    const query = ctx.query
    
    ctx.body = {
        errno: 0,
        query
    }
})
router.post('/delete', async (ctx, next) => {
    const query = ctx.query
    
    ctx.body = {
        errno: 0,
        query
    }
})
module.exports = router
