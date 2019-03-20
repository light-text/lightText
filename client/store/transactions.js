import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
let defaultTransaction = {
  transaction: []
}
/**
 * ACTION CREATORS
 */
const getTransaction = transaction => ({type: GET_TRANSACTIONS, transaction})

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

export default function(state = defaultTransaction, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {state, transaction: action.transaction}
    default:
      return state
  }
}
