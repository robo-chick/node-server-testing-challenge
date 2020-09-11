const express = require("express")
const cors = require("cors")
const poniesRouter = require("./ponies/ponies-router")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/ponies", poniesRouter)
server.get("/", (req, res) => {
    res.json({
        message: "Welcome to the My Little Pony API!",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Oops! Something went wrong!",
    })
})

module.exports = server