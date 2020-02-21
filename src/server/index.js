const path = require("path")
const express = require("express")
import "socket.io-client"
import socketio from "socket.io"

import { updateMatch, addUserToMatch, isFull } from "./match"
import { startGame } from "./game"

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

io.on("connection", conn => {
  console.log("a user connected", conn.id)

  const match = addUserToMatch(conn)
  updateMatch(match)

  console.log(match)

  if (isFull(match)) {
    startGame(match)
  }
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
