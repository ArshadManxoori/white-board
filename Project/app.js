//npm init
//npm install express
//npm install socket.io
//look package.json file , both are installed

//nodemon , if app is crashed then after error detection it will restart and doing well
// npm install --save-dev nodemon
//run file via -> nodemon app.js
/*nodemon not working*/

const express = require('express'); //to access
const socket = require('socket.io');

const app = express();  //application initiallize and sever ready

app.use(express.static("public"));  //it will display the index.html from public folder

let port = process.env.PORT || 5000;    //5000, 8080 , to use in device we just ue 5000, when we deploy it in heroku it will create it self
let server = app.listen(port, () => {    //make sever to ready to work
    console.log("Listening to port" + port);
})    

let io = socket(server);    

io.on("connection", (socket) => { //whenever connextion is maked we know it from this method, his method is same as addEve4ntListner 
    console.log("Made socket Connection");

    //Received data
    socket.on("beginPath", (data) => {
        //data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data); 
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})

