import { updateWorld } from "../common/world"
import { nextUsersInput, listenInputs } from "./input"
import { updateMatch, updateMatchWorld } from "./match"
import { sendUpdate } from "./net"

const timeStep = 1000 / 60
const updateStep = 1000 / 45

export const startGame = match => {
  console.log(`starting game for ${match.uuid}`)
  Object.values(match.users).forEach(listenInputs)

  let gameMatch = match
  let time = 0

  // run game simulation at 60fps
  setInterval(() => {
    gameMatch = tick(gameMatch)
    time += timeStep
  }, timeStep)

  // send world updates at 45fps
  setInterval(() => {
    //console.log("send update", time)
    sendUpdate(gameMatch, time)
  }, updateStep)
}

const tick = match => {
  const inputs = nextUsersInput(match.users)
  const world = updateWorld(match.world, inputs)

  //console.log("inputs", inputs)

  //console.log(`updating world for match ${match.uuid}`)

  return updateMatch({ ...match, world: world })
}
