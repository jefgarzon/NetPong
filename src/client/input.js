const keyMap = {}

const key = {
  W: 87,
  S: 83,
  UP: 38,
  DOWN: 40
}

export const setupInput = () => {
  document.addEventListener("keydown", onKeyDown)
  document.addEventListener("keyup", onKeyUp)
}

export const playerInputs = () => ({
  forward: keyMap[key.DOWN],
  backward: keyMap[key.UP]
})

const onKeyDown = evt => {
  keyMap[evt.keyCode] = true
}

const onKeyUp = evt => {
  keyMap[evt.keyCode] = false
}
