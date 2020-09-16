const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    deleteBlog } = require('../controller/blog');

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || ''
    let keyword = ctx.query.keyword || ''
    
    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            ctx.body = new ErrorModel('Please login')
            return
        }
        author = ctx.session.username
    }

    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
    const detailData = await getDetail(ctx.query.id)
    
    ctx.body = new SuccessModel(detailData)
})

router.post('/create', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username
    const createData = await newBlog(ctx.request.body)

    console.log("createData: ", createData)
    ctx.body = createData ? new SuccessModel(createData) : new ErrorModel("Error when create blog")
})

router.post('/update', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username
    const updateData = await newBlog(ctx.query.id, ctx.body)
    
    ctx.body = updateData ? new SuccessModel(updateData) : new ErrorModel("Error when update blog")
})

router.post('/delete', loginCheck, async (ctx, next) => {
    ctx.body.author = ctx.session.username
    const deleteData = await deleteBlog(ctx.query.id, ctx.body.author)

    ctx.body = deleteBlog ? new SuccessModel(deleteData) : new ErrorModel("Error when delete blog")
})

module.exports = router
