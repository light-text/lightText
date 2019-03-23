import axios from 'axios'

const GET_ALLUSERS = 'GET_ALLUSERS'

const users = []

const getAllUsers = users => ({type: GET_ALLUSERS, users})

export const getAllUsersThunks = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/users')
      dispatch(getAllUsers(res.data))
    } catch (error) {
      throw new Error('An error has occur: err')
    }
  }
}

export default function(state = users, action) {
  switch (action.type) {
    case GET_ALLUSERS:
      return action.users
    default:
      return state
  }
}
