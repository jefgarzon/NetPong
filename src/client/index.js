import "./net"

import { initialWorld, updateWorld, size } from "./world"
import { drawWorld } from "./draw"
import { setupInput, playerInputs } from "./input"

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

//adjust canvas parameters
canvas.width = canvas.height = size

//paint background
context.fillColor = "#000"
context.fillRect(0, 0, size, size)

let world = initialWorld()

setupInput()

setInterval(() => {
  drawWorld(context, world)
  world = updateWorld(world, playerInputs())
}, 1000 / 60)
