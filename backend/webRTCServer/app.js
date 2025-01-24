const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3003;

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();
const socketIdToRoomId = new Map();

io.on('connection', (socket) => { 
    console.log("User connected", socket.id);

    socket.on('join-room', (roomId, userId) => {
        console.log("User joined room", roomId, userId);
        emailToSocketMapping.set(userId, socket.id);
        socketToEmailMapping.set(socket.id, userId);
        socketIdToRoomId.set(socket.id, roomId);
        socket.join(roomId);
        socket.emit("joined-room", {roomId});
        socket.broadcast.to(roomId).emit('user-connected', userId);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    })

    socket.on('send-message', (message) => {
        console.log("sending message.......",message)

        socket.broadcast.to(socketIdToRoomId.get(socket.id)).emit('receive-message', message);
    })

    socket.on('send-sdp', (userId,sdp) => {
        console.log('send-sdp',userId)

        const fromId = socketToEmailMapping.get(socket.id);
        const socketId = emailToSocketMapping.get(userId);
        console.log(fromId,socketId, socket.id ,"From Id")
        socket.to(socketId).emit('receive-sdp', {from: fromId, sdp,ans:"123"});
    })

    socket.on('accept-sdp', data => {
        console.log("accept-sdp",data)
        const {userId, ans} = data;
        const socketId = emailToSocketMapping.get(userId);
        socket.to(socketId).emit('receive-accept-sdp', {ans});
    })
})

app.get('/', (req, res) => {
    res.send('Server is running');
})

server.listen(PORT, () => {
    console.log(`Socket Server is running on port ${PORT}`);
})