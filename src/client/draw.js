export const drawWorld = (ctx, world) => {
  clean(ctx)
  drawBall(ctx, world.ball)
  world.players.forEach(player => drawPlayer(ctx, player))
}

const clean = ctx => {
  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, 700, 700)
}

const drawBall = (ctx, ball) => {
  ctx.fillStyle = "#DDD"
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false)
  ctx.fill()
}

const drawPlayer = (ctx, player) => {
  ctx.fillStyle = "#EEE"
  ctx.beginPath()
  ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI, false)
  ctx.fill()
}
