const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')

// get cookie expire time
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// for processing post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // get post data
        if (req.method !== 'POST') {
            // console.log("not a post request")
            resolve({})
            return
        }
        
        if (req.headers['content-type'] !== 'application/json') {
            console.log("content-typle incorrect")
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            console.log("postData: ", postData)
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    req.path = req.url.split('?')[0]
    // analyze query
    req.query = querystring.parse(req.url.split('?')[1])

    // parse cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    });

    // parse session
    let needSetCookie = false
    let userId = req.cookie.userid

    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // init sessionId inside redis
        set(userId, {})
    }
    // get sessionId's value into the req
    req.sessionId = userId

    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // init sessionId inside redis
            set(req.sessionId, {})
            // set session in request
            req.session = {}
        } else {
            req.session = sessionData
        }
        console.log('req.session: ', req.session)

        return getPostData(req)
    })
    .then(postData => {
        req.body = postData

        const blogResult = handleBlogRouter(req, res)
        const userData = handleUserRouter(req, res)

        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
    
        if (userData) {
            userData.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle
