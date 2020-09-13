const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// login check
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('You need to login first')
        )
    }
}

const handleBlogRouters = (req, res) => {
    // create a new blog
    if (req.method === 'POST' && req.path === '/api/blog/create') {
        
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }

        const author = req.session.username // fake data
        req.body.author = author
        const result = newBlog(req.body)

        return result.then(newBlogData => {
            if (newBlogData) {
                console.log("successfully created a new blog")
                return new SuccessModel(`created blog, id is ${newBlogData}`)
            }
        })
    }

    // get the list of all blog
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }

            author = req.session.username
        }

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // delete a blog
    if (req.method === 'POST' && req.path === '/api/blog/delete') {
        const id = req.query.id || ''
        const author = req.session.username // fake data

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }

        return deleteBlog(id, author).then(result => {
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel("Error when delete blog")
            }
            
        })
    }

    // update a blog
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        const id = req.query.id || ''

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        
        return updateBlog(id, req.body).then(ifUpdateSuccess => {
            if (ifUpdateSuccess) {
                return new SuccessModel()
            } else {
                return new ErrorModel("Error when update blog")
            }
        })
    }

    // loog for the detail of a blog
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || ''
        const result = getDetail(id)

        return result.then(detailData => {
            if (detailData) {
                return new SuccessModel(detailData)
            }
        })
    }
}

module.exports = handleBlogRouters