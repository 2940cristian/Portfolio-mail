const express = require("express");
const server = express();
const mongoose = require("mongoose");
const Message = require("./Models/Message")
const cors = require("cors");

mongoose.connect(`mongodb://2940cristian:${process.env.MLABS_PASSWORD}@ds261302.mlab.com:61302/messages1`, {useNewUrlParser: true}).then(mongo => {
    console.log("Connected to database")
}).catch(err => {
    console.log("Error connecting to database")
})

server.use(express.json())
server.use(cors())

server.get("/wakeup", (req, res) => { //On FE a function call on component mount will wake up the server as it is on a free dyno
    res.status(200)
})

server.get("/", (req, res) => {
    Message.find().then(messages => {
        res.status(200).json(messages)
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.post("/", (req, res) => {
    const content = req.body.content;
    
    Message.create({content: content, created_at: new Date}).then(success => {
        console.log("Saved");
        res.status(200).json({Message: "Saved"})
    }).catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
})

server.delete("/:id", (req, res) => {
    const id = req.params.id
    Message.findByIdAndDelete(id).then(Success => {
        res.status(200).json({Message: "Deleted"})
    }).catch(err => {
        res.status(400).json({err: "No message by that id was found"})
    })
})
server.listen( process.env || 5000, () => {console.log("Now listening on port 5000")})