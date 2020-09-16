const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (xss(author)) {
        sql += `and author='${author}'`
    }
    if (xss(keyword)) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return await exec(sql)
}

const getDetail = async (id) => {
    let sql = `select * from blogs where 1=1 `
    if (xss(id)) {
        sql += `and id='${id}'`
    }
    sql += `order by createtime desc;`
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    if (blogData) {
        const title = xss(blogData.title)
        const content = xss(blogData.content)
        const author = blogData.author
        const createtime = Date.now()

        let sql = `insert into blogs(title, content, createtime, author) values ("${title}", "${content}", "${createtime}", "${author}");`
        const insertData = await exec(sql)

        return {
            id: insertData.insertId
        }
    }
}

const updateBlog = async (id, blogData = {}) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    let sql = `update blogs set title='${title}', content='${content}' where id='${id}';`

    const updateData = await exec(sql)
    
    if (updateData.affectedRows > 0) {
        return true
    } else {
        return false
    }
}

const deleteBlog = async (id, author) => {

    let sql = `delete from blogs where id='${xss(id)}' and author='${xss(author)}'`
    const deleteData = await exec(sql)
    if (deleteData.affectedRows > 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}