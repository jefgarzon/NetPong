import { updateWorld } from "./world"
import { drawWorld } from "./draw"

const size = 700 //px
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

//adjust canvas parameters
canvas.width = canvas.height = size

//paint background
context.fillColor = "#000"
context.fillRect(0, 0, size, size)

let world = {
  ball: {
    x: size / 2,
    y: size / 2 + 10,
    radius: 50,
    speed: { x: 3, y: 0 }
  },
  players: [
    {
      x: 0,
      y: size / 2 - 10,
      radius: 50,
      speed: { x: 0, y: 0 },
      type: "vertical"
    },
    {
      x: size,
      y: size / 2,
      radius: 50,
      speed: { x: 0, y: 0 },
      type: "vertical"
    }
  ]
}

setInterval(() => {
  drawWorld(context, world)
  world = updateWorld(world, [])
}, 1000 / 60)
