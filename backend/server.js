const express = require('express');
// section mongooseDB
const cors = require('cors');
const mongoose = require('mongoose');
const Child = require('./models/child.model');
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

io.on('connection', (socket) => {
    // receve username join the mindmap and name mindmap select. 
        socket.on('start', ( name, mindmap, fn) => {
            fn(`welcome ${name} to the ${mindmap}`);  
            socket.broadcast.emit('join', `${name} has join the mindmap`);
        });
        
        socket.on('get all childs circles', (mindmap, fn) => {           
            Child.find()
            .then(childs => fn(childs), console.log('get all'))
            .catch(err => console.log(json('Error: ' + err)));
        });

        socket.on('add new child circle', (title, description, id, fn) => {
            const newChildCircle = new Child({title, description, id});
            newChildCircle.save()
            .then(() => console.log('Child circle added!'))
            .then(
                Child.find()
                    .then(childs => fn(childs), console.log('added'))
                    .catch(err => console.log(json('Error: ' + err)))
            )
            .then(socket.broadcast.emit('getAllAdd', 'add' ))
            .catch(error => json('Error : ' + error))
            
            
        });

        socket.on('delete the last child circle', (id, fn) => {
            Child.findByIdAndDelete(id)
            .then(() => console.log('Child circle deleted!'))
            .then(Child.find()
                    .then(childs => fn(childs), console.log('deleted'))
                    .catch(err => console.log(json('Error: ' + err)))
            )
            .then(socket.broadcast.emit('getAllDelete', 'delete'))
            .catch(error => json('Error : ' + error));
         });

        socket.on('get child circle by ID', (id, fn) => {
            Child.findById(id)
            .then( child => fn(child), console.log('get'))
            .catch(error => console.log('Error : ' + error))
        }),

        socket.on('update props circle', (id, updateCircle) => {
            Child.findById(id)
            .then(child => {
                child.title = updateCircle.title
                child.description = updateCircle.description
                child.id = Number(updateCircle.id)
    
            child.save()
                .then(() => console.log('child circle uptdated!!'))
                .catch(error => console.log('Error : ' + error))
            })
            .then(socket.broadcast.emit('update', 'updated'))
            .catch(error => console.log('Error : ' + error))
        });

});


server.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
});
// -------------------------------------------------------------