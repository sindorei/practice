const express = require('../express')

const app = express()


app.use(function(req, res, next) {
    console.log('middleware 1')
    next()
})

app.use('/hello', function(req, res, next) {
    console.log('hello middleware...')
    next()
})

app.get('/hello', (req, res) => {
    res.end('Hello!')
})

app.post('/posttest', (req, res) => {
    res.end('POST TEST!')
})

app.listen(3000, () => {
    console.log('start...')
})
