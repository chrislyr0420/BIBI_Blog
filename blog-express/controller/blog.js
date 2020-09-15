const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (xss(author)) {
        sql += `and author='${author}'`
    }
    if (xss(keyword)) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where 1=1 `
    if (xss(id)) {
        sql += `and id='${id}'`
    }
    sql += `order by createtime desc;`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    if (blogData) {
        const title = xss(blogData.title)
        const content = xss(blogData.content)
        const author = xss(blogData.author)

        if (!title || !content || !author) {
            console.log("blogData is not enough")
            return {}
        } else {
            const createtime = Date.now()
            let sql = `insert into blogs(title, content, createtime, author) values ("${title}", "${content}", "${createtime}", "${author}");`
            return exec(sql).then(insertData => {
                return {
                    id: insertData.insertId
                }
            })
        }
    }
    console.log("blogData is empty")
}

const updateBlog = (id, blogData = {}) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    let sql = `
        update blogs set title='${title}', content='${content}' where id='${id}';
    `

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

const deleteBlog = (id, author) => {

    let sql = `delete from blogs where id='${xss(id)}' and author='${xss(author)}'`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
    })
}

module.exports = {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}