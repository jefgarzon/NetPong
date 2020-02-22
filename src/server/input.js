import { onInput } from "./net"

const inputs = {}

const pushInput = (inputs, input) => [...inputs, input]
const popInput = userInputs => {
  const [input, ...rest] = userInputs
  return { input, rest }
}

const updateInputs = (userId, userInputs) => (inputs[userId] = userInputs) // TODO: not that functional

export const nextUsersInput = users => {
  return Object.keys(users).reduce((acc, userId) => {
    const playerId = users[userId].playerId
    return { ...acc, [playerId]: nextUserInput(userId) }
  }, {})
}

const nextUserInput = userId => {
  const userInputs = inputs[userId]
  const { input, rest } = popInput(userInputs)

  updateInputs(userId, rest)

  return input
}

export const listenInputs = user => {
  const userId = user.conn.id

  updateInputs(userId, [])

  onInput(user, input => {
    //console.log("userId", input)
    updateInputs(userId, pushInput(inputs[userId], input))
  })
}
