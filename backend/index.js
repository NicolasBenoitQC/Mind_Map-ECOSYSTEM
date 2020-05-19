/*const express = require('express');

// section socket.io
const socketio = require('socket.io'); 
const http = require('http');
const { addUser, removeUser, getUser, getUserInMindmap } = require('./users.js');

const app = express();
const port = process.env.PORT || 5005;

// -------------- section socket.io ----------------------------
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('login', ({ name, mindmap }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, mindmap });
        
        if(error) return callback(error);

        socket.emit('message', { user: 'adim', text: `${user.name}, welcome to the mindmap : ${user.mindmap}`});
        socket.broadcast.to(user.room).emit('message', { user: 'adim', text: `${user.name}, has joined the mindmap`});

        socket.login(user.mindmap);
        callback();
    });

    socket.on('disconnet', () => {
        console.log('User had left!!!');
    });
});

const router = require('./routerUser.js');

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
});

*/