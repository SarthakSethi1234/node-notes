const EventEmitter = require("events")

// responsible for imporing events module

const eventEmitter = new EventEmitter()



// attaching a new event
eventEmitter.on('greet',(username) => {
    console.log(`Hello ${username} and welcome to events in node js`)
})

eventEmitter.once('pushnotify',()=>{
    console.log("This event will run only once")
})

// Emmit the event second argument is data

eventEmitter.emit('greet',"hitesh")
eventEmitter.emit('greet',"sarthak")
eventEmitter.emit('pushnotify')
eventEmitter.emit('pushnotify')



const myListner = () => {
  console.log("i am a test listener");
};
eventEmitter.on("test", myListner);

eventEmitter.emit("test");
eventEmitter.removeListener("test",myListner)
eventEmitter.emit("test");