const http = require('http')
const URL = require('url')
function createApplication() {
    const app = (req, res) => {
        let url = URL.parse(req.url)
        let pathname = url.pathname
        let reqMethod = req.method
        for(let route of app.routes) {
            if (route.method === reqMethod && route.path === pathname) {
                return route.handler(req, res)
            }
        }

        res.statusCode = 404
        res.end(`can not found ${reqMethod} ${pathname}`)

    }
    app.listen = function () {
        const server = http.createServer(app)
        server.listen(...arguments)
    }

    app.routes = []

    http.METHODS.forEach(method => {
        let lowerCaseMethod = method.toLowerCase()
        app[lowerCaseMethod] = function (path, handler) {
            let layser = {
                method,
                path,
                handler
            }
            app.routes.push(layser)
        }
    })

    return app
}


module.exports = createApplication