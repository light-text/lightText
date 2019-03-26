import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const POST_MESSAGE = 'POST_MESSAGE'
/**
 * INITIAL STATE
 */
let defaultTransaction = {
  transaction: [],
  message: ''
}
/**
 * ACTION CREATORS
 */
const getTransaction = transaction => ({type: GET_TRANSACTIONS, transaction})
const postMessage = message => ({type: POST_MESSAGE, message})
/**
 * THUNK CREATORS
 */

export const getTransactionThunk = () => {
  return async dispatch => {
    try {
      const results = await axios.get('/api/transactions')
      dispatch(getTransaction(results.data))
    } catch (error) {
      throw new Error('An error has occur: err')
    }
  }
}

export const postMessageThunk = messages => {
  return async dispatch => {
    try {
      const results = await axios.post('/api/sms', {
        messages
      })
      dispatch(postMessage(results.data))
    } catch (error) {
      throw new Error('An error has occur: err')
    }
  }
}

export default function(state = defaultTransaction, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, transaction: action.transaction}
    case POST_MESSAGE:
      return {...state, message: action.message}
    default:
      return state
  }
}
