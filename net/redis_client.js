/**
 * https://redis.io/topics/protocol
 */

const net = require('net')

const socket = net.createConnection(6379, function() {
    // redis set
    socket.write('*3\r\n$3\r\nset\r\n$5\r\nalpha\r\n$3\r\n456\r\n')
})
// redis get
// socket.write('*2\r\n$3\r\nget\r\n$5\r\nalpha\r\n')

const data = []
socket.on('data', chunk => {
   console.log(chunk.toString())
})