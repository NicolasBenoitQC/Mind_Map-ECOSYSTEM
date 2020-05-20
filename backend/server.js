const express = require('express');
// section mongooseDB
const cors = require('cors');
const mongoose = require('mongoose');
// section socket.io
const socketio = require('socket.io'); 
const http = require('http');
//const { addUser, removeUser, getUser, getUserInMindmap } = require('./user');

// -------------- section set server ----------------------------
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------

// -------------- section mongooseDB ----------------------------
// import file .env where the information to ATLAS_URI=mongodb+srv: is define;
require('dotenv').config();
const uri = process.env.ATLAS_URI;
// login to data base MongooseDB;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
// connect to data base MongooseDB;
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
});

// import the router of the data childs for the request; 
const childsRouter = require('./routes/childs');
app.use('/childs', childsRouter);
// -------------------------------------------------------------

// -------------- section socket.io ----------------------------
const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.send('Server for socket.io is up and running');
  });



io.on('connection', (socket) => {
        socket.on('ferret', ( name, mindmap, fn) => {
            fn(`welcome ${name} to the ${mindmap}`);  
            socket.broadcast.emit('join', `${name} has join the mindmap`);
        });
});


server.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
});
// -------------------------------------------------------------