import { initialWorld, updateWorld } from "../common/world"

const matches = {}

export const addUserToMatch = conn => {
  return addUser(availableMatch() || createMatch(), conn)
}

const createMatch = () => {
  console.log("new match")
  return {
    uuid: Math.random(),
    world: initialWorld(),
    users: {},
    usersLimit: 2
  }
}

const addUser = (match, conn) => {
  return {
    ...match,
    users: {
      ...match.users,
      [conn.id]: {
        conn: conn,
        playerId: availableMatchPlayerId(match)
      }
    }
  }
}

export const isFull = match =>
  Object.keys(match.users).length == match.usersLimit

const availableMatch = () => {
  return Object.values(matches).find(match => !isFull(match))
}

const availableMatchPlayerId = match => {
  return Object.keys(match.users).length
}

export const updateMatch = match => (matches[match.uuid] = match) // TODO: not that functional programming
