const http = require('http')

function express() {

    let funcs = []

    const app = (req, res) => {
        let i = 0

        const next = () => {
            const task = funcs[i++]
            if (!task) {
                return
            } else {
                task(req, res, next)
            }
        }

        next()
    }

    app.use = (task) => {
        funcs.push(task)
    }

    return app
}

const app = express()

http.createServer(app).listen('3000', () => {
    console.log('listening 3000')
})

const middlewareA = (req, res, next) => {
    console.log('middlewareA before next()')
    next()
    console.log('middlewareA after next()')
}

const middlewareB = (req, res, next) => {
    console.log('middlewareB before next()')
    next()
    console.log('middlewareB after next()')
}

const middlewareC = (req, res, next) => {
    console.log('middlewareC')
    res.end()
}

app.use(middlewareA)
app.use(middlewareB)
app.use(middlewareC)