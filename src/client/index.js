import "./net"

import { initialWorld, updateWorld, size } from "../common/world"
import { drawWorld } from "./draw"
import { setupInput, playerInputs } from "./input"
import { sendInput } from "./net"
import { lastSnapshot } from "./snapshot"

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

//adjust canvas parameters
canvas.width = canvas.height = size

//paint background
context.fillColor = "#000"
context.fillRect(0, 0, size, size)

setupInput()

setInterval(() => {
  const snapshot = lastSnapshot()

  if (snapshot) {
    drawWorld(context, snapshot.world)
  }

  const input = playerInputs()
  sendInput(input)
}, 1000 / 60)
