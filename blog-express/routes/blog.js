var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../middleware/loginCheck')
const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    deleteBlog } = require('../controller/blog')

router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    
    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json(
                new ErrorModel('Please login')
            )
            return
        }
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
})

router.get('/detail', function(req, res, next) {
    const result = getDetail(req.query.id)

    return result.then(detailData => {
        res.json(
            new SuccessModel(detailData)
        )
    })
})

module.exports = router;