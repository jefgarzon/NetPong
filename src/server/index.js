const path = require("path")
const express = require("express")
import "socket.io-client"
import socketio from "socket.io"

const port = 3000
const app = express()
const http = require("http").createServer(app)
const io = socketio(http, { serveClient: false })

app.use(express.static(path.join(__dirname + "/../public")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"))
})

app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/client.bundle.js"))
})

io.on("connection", () => {
  console.log("a user connected")
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
