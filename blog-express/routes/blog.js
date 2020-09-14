var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    deleteBlog } = require('../controller/blog')

router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    
    // if (req.query.isadmin) {
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         return loginCheckResult
    //     }

    //     author = req.session.username
    // }

    const result = getList(author, keyword)
    result.then(listData => {
        res.json(new SuccessModel(listData))
    })
})

router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'OK'
    })
})

module.exports = router;