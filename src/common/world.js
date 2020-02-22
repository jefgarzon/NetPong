export const size = 700

export const initialWorld = () => {
  return {
    time: 0,
    ball: {
      x: size / 2,
      y: size / 2 + 10,
      radius: 50,
      speed: { x: 3, y: 0 }
    },
    players: [
      {
        id: "0",
        x: 0,
        y: size / 2 - 10,
        radius: 50,
        speed: { x: 0, y: 0 },
        type: "vertical"
      },
      {
        id: "1",
        x: size,
        y: size / 2,
        radius: 50,
        speed: { x: 0, y: 0 },
        type: "vertical"
      }
    ]
  }
}

export const updateWorld = (state, inputs) => {
  const ball = updateBall(state.ball)
  const players = state.players.map((p, index) => {
    const playerInput = inputs[p.id] || {}
    return updatePlayer(p, playerInput)
  })

  return checkCollisions({
    ...state,
    ball,
    players
  })
}

const checkCollisions = state => {
  return {
    ...state,
    ball: checkBallCollision(state.ball, state.players),
    players: state.players.map(checkPlayerBorderCollision)
  }
}

const updateBall = ball => {
  return {
    ...ball,
    x: ball.x + ball.speed.x,
    y: ball.y + ball.speed.y
  }
}

const updatePlayer = (player, input) => {
  return updatePlayerPos(updatePlayerSpeed(player, input))
}

const updatePlayerPos = player => {
  return {
    ...player,
    x: player.x + player.speed.x,
    y: player.y + player.speed.y
  }
}

const updatePlayerSpeed = (player, input) => {
  const dir = (input.forward && 1) || (input.backward && -1) || 0
  let speed

  if (player.type == "vertical") {
    speed = { x: 0, y: 3 * dir }
  } else {
    speed = { x: 3 * dir, y: 0 }
  }

  return {
    ...player,
    speed
  }
}

const checkBallCollision = (ball, players) => {
  return checkBallBorderCollision(
    players.reduce(
      (ball, player) => checkBallPlayerCollision(ball, player),
      ball
    )
  )
}

const checkBallBorderCollision = ball => {
  let x = ball.x
  let y = ball.y
  const speed = { ...ball.speed }

  if (ball.x - ball.radius <= 0) {
    speed.x = speed.x * -1
    x = ball.radius
  } else if (ball.x + ball.radius >= size) {
    speed.x = speed.x * -1
    x = size - ball.radius
  }

  if (ball.y - ball.radius <= 0) {
    speed.y = speed.y * -1
    y = ball.radius
  } else if (ball.y + ball.radius >= size) {
    speed.y = speed.y * -1
    y = size - ball.radius
  }

  return { ...ball, x, y, speed }
}

const checkPlayerBorderCollision = player => {
  return player.type == "horizontal"
    ? checkHPlayerBorderCollision(player)
    : checkVPlayerBorderCollision(player)
}

const checkBallPlayerCollision = (ball, player) => {
  const distanceBallPlayer = distance(ball, player)
  const radiusSum = ball.radius + player.radius

  if (distanceBallPlayer >= radiusSum) {
    return ball
  }

  const normal = {
    x: (ball.x - player.x) / distanceBallPlayer,
    y: (ball.y - player.y) / distanceBallPlayer
  }

  return invertBallSpeed(
    separateBallPlayer(ball, player, normal, radiusSum),
    normal
  )
}

const invertBallSpeed = (ball, normal) => {
  const dot = ball.speed.x * normal.x + ball.speed.y * normal.y

  return {
    ...ball,
    speed: {
      x: ball.speed.x - 2 * dot * normal.x,
      y: ball.speed.y - 2 * dot * normal.y
    }
  }
}

const separateBallPlayer = (ball, player, normal, distance) => {
  return {
    ...ball,
    x: player.x + normal.x * distance,
    y: player.y + normal.y * distance
  }
}

const checkHPlayerBorderCollision = player => {
  let x = player.x

  if (player.x - player.radius < 0) {
    x = player.radius
  } else if (player.x + player.radius > size) {
    x = size - player.radius
  }

  return { ...player, x }
}

const checkVPlayerBorderCollision = player => {
  let y = player.y

  if (player.y - player.radius < 0) {
    y = player.radius
  } else if (player.y + player.radius > size) {
    y = size - player.radius
  }

  return { ...player, y }
}

const distance = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}
