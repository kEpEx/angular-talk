const express = require('express')
const app = express()

//app.get('/', (req, res) => res.send('Hello World!1'))

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//app.listen(3000, () => console.log('Example app listening on port 3000!'))

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){ 
    console.log('connected');

    socket.on('chat-message', function(msg){
        console.log('message: ' + msg);


        io.emit('chat-rcv', msg);

      });

      socket.on('emote', function(emote){
        console.log('message: ' + emote);


        io.emit('emote-rcv', emote);

      });

 });
server.listen(3000);
