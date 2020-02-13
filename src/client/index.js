const size = 700 //px
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

//adjust canvas parameters
canvas.width = canvas.height = size

//paint background
context.fillColor = "#000"
context.fillRect(0, 0, size, size)

const initialState = {
  ball: {
    x: size / 2,
    y: size / 2,
    speed: { x: 1, y: 0 }
  },
  players: [
    {
      x: 0,
      y: size / 2,
      speed: { x: 0, y: 1.5 },
      type: "vertical"
    },
    {
      x: size,
      y: size / 2,
      speed: { x: 0, y: 1.5 },
      type: "vertical"
    }
  ]
}

const updateWorld = (state, inputs) => {
  const ball = updateBall(state.ball)
  const players = state.players.map((p, index) =>
    updatePlayer(p, inputs[index])
  )

  return {
    ball,
    players
  }
}

const checkCollisions = state => {
  return {
    ball: checkBallBorderCollisions(state.ball),
    players: state.players.map(checkPlayerBorderCollisions)
  }
}

const updateBall = ball => {
  return {
    x: ball.x + ball.speed.x,
    y: ball.y + ball.speed.y
  }
}

const updatePlayer = (player, inputs) => {
  return {
    x: player.x + player.speed.x * inputs.horizontal,
    y: player.y + player.speed.y * inputs.vertical
  }
}

const checkBallBorderCollisions = ball => {
  const x = 0
  const y = 0
  const speed = { ...ball.speed }

  if (ball.x <= 0) {
    speed.x = 1
    x = 0
  } else if (ball.x >= size) {
    speed.x = -1
    x = size
  }

  if (ball.y <= 0) {
    speed.y = 1
    y = 0
  } else if (ball.y >= size) {
    speed.y = -1
    y = size
  }

  return { x, y, speed }
}

const checkPlayerBorderCollisions = player => {}
