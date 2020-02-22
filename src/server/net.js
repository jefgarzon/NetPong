import socketio from "socket.io"

let io

export const initNet = http => {
  io = socketio(http, { serveClient: false })
}

export const onConnection = cb => io.on("connection", cb)
export const onInput = (user, cb) => user.conn.on("input", cb)

export const sendUpdate = (match, time) => {
  const update = {
    world: match.world,
    time: time
  }

  Object.values(match.users).forEach(user => {
    user.conn.emit("update", update)
  })
}
