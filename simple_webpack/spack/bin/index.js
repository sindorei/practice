#! /usr/bin/env node


let entry = './entry.js'
let output = './dist/main.js'
const fs = require('fs')
const script = fs.readFileSync(entry, 'utf8')

const template = `(function (modules) {
        function require(moduleId) {
            let module = {
                exports: {}
            }
            modules[moduleId].call(module.exports, module.exports, module, require)
            return module.exports
        }
        return require('${entry}')
    })({
        '${entry}': function (module, exports, require) {
            eval(\`${script}\`)
        }
    })`

    fs.writeFileSync(output, template)


    console.log('输出成功!')