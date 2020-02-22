const path = require("path")
const express = require("express")

import { updateMatch, addUserToMatch, isFull } from "./match"
import { startGame } from "./game"
import { initNet, onConnection } from "./net"

const port = 3000
const app = express()
const http = require("http").createServer(app)

app.use(express.static(path.join(__dirname + "/../public")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"))
})

app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/client.bundle.js"))
})

initNet(http)

onConnection(conn => {
  console.log("a user connected", conn.id)

  const match = addUserToMatch(conn)
  updateMatch(match)

  if (isFull(match)) {
    startGame(match)
  }
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
