const http = require('http')
const URL = require('url')
function createApplication() {
    const app = (req, res) => {
        let url = URL.parse(req.url)
        let pathname = url.pathname
        let reqMethod = req.method
        let index = 0
        function next(err) {
           
            let middleware = app.middlewares[index++]
            
            if (middleware) {
                if (pathname.startsWith(middleware.path)) {
                    middleware.handler(req, res, next)
                } 
            } else {
                for(let route of app.routes) {
                    if (route.method === reqMethod && route.path === pathname) {
                        return route.handler(req, res)
                    }
                }
                res.statusCode = 404
                res.end(`can not found ${reqMethod} ${pathname}`)
            }
        }
        next()
    }
    app.listen = function () {
        const server = http.createServer(app)
        server.listen(...arguments)
    }

    app.routes = []
    app.middlewares = []

    http.METHODS.forEach(method => {
        let lowerCaseMethod = method.toLowerCase()
        app[lowerCaseMethod] = function (path, handler) {
            let layer = {
                method,
                path,
                handler
            }
            app.routes.push(layer)
        }
    })

    app.use = function(path, handler) {
        if (typeof handler !== 'function') {
            handler = path
            path = '/'
        }
        let layer = {
            path,
            handler
        }
        app.middlewares.push(layer)
    }

    return app
}


module.exports = createApplication