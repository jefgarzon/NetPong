import { updateWorld } from "../common/world"
import { nextUsersInput, listenInputs } from "./input"
import { updateMatch, updateMatchWorld } from "./match"

export const startGame = match => {
  console.log(`starting game for ${match.uuid}`)
  Object.values(match.users).forEach(listenInputs)

  setInterval(() => {
    const inputs = nextUsersInput(match.users)
    const world = updateWorld(match.world, inputs)

    console.log(`updating world for match ${match.uuid}`)

    updateMatch(updateMatchWorld(match, world))
  }, 1000 / 60)
}
