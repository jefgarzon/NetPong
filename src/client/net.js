import io from "socket.io-client"

import { addSnapshot } from "./snapshot"

const socket = io()

socket.on("connect", () => console.log("connected"))

socket.on("update", snapshot => {
  //console.log("new update", snapshot.time)
  addSnapshot(snapshot)
})

export const sendInput = input => {
  console.log("input", input)
  socket.emit("input", input)
}
