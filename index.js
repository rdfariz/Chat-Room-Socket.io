var app = require('express')();
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket)=>{
    console.log('a user connected')
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('ada yang disconnect nih');
        console.log('user disconnect')
    })
    socket.on('submitMessage', (msg)=>{
        io.emit('submitMessage', msg);
        console.log('message: '+msg)
    })
})

http.listen(3000, ()=>{
    console.log('listening on :3000')
})