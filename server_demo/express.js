const express = require('../express')

const app = express()

app.get('/hello', (req, res) => {
    res.end('Hello!')
})

app.post('/posttest', (req, res) => {
    res.end('POST TEST!')
})

app.listen(3000, () => {
    console.log('start...')
})
