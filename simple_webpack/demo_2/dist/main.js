(function (modules) {
        function require(moduleId) {
            let module = {
                exports: {}
            }
            modules[moduleId].call(module.exports, module.exports, module, require)
            return module.exports
        }
        return require('./entry.js')
    })({
        './entry.js': function (module, exports, require) {
            eval(`console.log('这个是入口文件。。。')


module.exports = {
    name: '张三',
    age: 20
}`)
        }
    })