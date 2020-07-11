let factories = {}

function define(moduleName, deps, factory) {
    factories[moduleName] = factory
    factory.deps = deps
}

function require(modules, cb) {
    let res = modules.map(function(mod) {
        let factory = factories[mod]
        let deps = factory.deps
        let exports
        require(deps, function () {
            exports = factory.apply(null, arguments)
        })
        return exports
    })
    cb.apply(null, res)
}


define('name', ['age'], function (age) {
    return '张三' + age
})

define('age', [], function () {
    return 20
})

require(['name'], function (name) {
    console.log('name: %s', name)
})

require(['age'], function (age) {
    console.log('age: %d', age)
})