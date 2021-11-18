//import module
var events = require('events');

//create eventHandler object
var eventEmitter = new events.EventEmitter();

//event handler
var connectHandler = function connected(){
    console.log("Connection successful.");

    //fire data_received event
    // eventEmitter.emit("data_received")
}

//bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

//bind data received event with anonymous function
eventEmitter.on("data_received", function(){
    console.log("data receivced successfully");
})

eventEmitter.on("data_received", function(){
    console.log("new event");
})

// console.log(eventEmitter.listeners("connection"))



eventEmitter.emit("connection");
eventEmitter.removeListener("connection", connectHandler) //unbinds
// console.log(eventEmitter.listeners("connection"))

eventEmitter.emit("data_received")