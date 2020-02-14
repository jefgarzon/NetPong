const size = 700

export const updateWorld = (state, inputs) => {
  const ball = updateBall(state.ball)
  const players = state.players.map((p, index) => {
    const playerInputs = inputs[index] || []
    return updatePlayer(p, playerInputs)
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
    ball: checkBallCollision(state.ball, state.players)
    // players: state.players.map(checkPlayerBorderCollision)
  }
}

const updateBall = ball => {
  return {
    ...ball,
    x: ball.x + ball.speed.x,
    y: ball.y + ball.speed.y
  }
}

const updatePlayer = (player, inputs) => {
  return {
    ...player,
    x: player.x + player.speed.x,
    y: player.y + player.speed.y
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
  const x = player.x

  if (player.x - player.radius < 0) {
    x = player.radius
  } else if (player.x + player.radius > size) {
    x = size - player.radius
  }

  return { ...player, x }
}

const checkVPlayerBorderCollision = player => {
  const y = player.y

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
