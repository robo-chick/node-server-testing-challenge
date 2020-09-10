const express = require("express")
const cors = require("cors")

const server = express()

server.use(cors())
server.use(express.json())

server.get("/", (req, res) => {
    console.log(err)
    res.status(500).json({
        message: "Oops! Something went wrong!",
    })
})

module.exports = server