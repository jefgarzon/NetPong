const inputs = {}

const pushInput = (inputs, input) => [...inputs, input]
const popInput = userInputs => {
  const [input, ...rest] = userInputs
  return { input, inputs: rest }
}

const updateInputs = (userId, userInputs) => (inputs[userId] = userInputs) // TODO: not that functional

export const nextUsersInput = users => {
  return Object.keys(users).reduce((inputs, userId) => {
    const playerId = users[userId].playerId
    return { ...inputs, [playerId]: nextUserInput(userId) }
  }, {})
}

const nextUserInput = userId => {
  const userInputs = inputs[userId]
  return popInput(userInputs)
}

export const listenInputs = user => {
  const userId = user.conn.id

  updateInputs(userId, [])

  user.conn.on("input", input => {
    updateInputs(userId, pushInput(inputs[userId], input))
  })
}
