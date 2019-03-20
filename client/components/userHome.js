import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTransactionThunk} from '../store/transactions'
/**
 * COMPONENT
 */
export class userHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getTransaction()
  }
  render() {
    const {user, transactions} = this.props
    console.log(transactions, 'LetSeeeeeeee')
    return (
      <div>
        <div id="iphone">
          <h3 id="welcome">Welcome, {user.username}</h3>
          <p>Your balance : {user.balance} satoshis.</p>
          <p>Your transactions : </p>
          <img
            id="iphoneImage"
            style={{width: 250, height: 501}}
            src="/images/iphone.png"
          />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    transactions: state.transactions
  }
}
const dispatchMapState = dispatch => {
  return {
    getTransaction: () => dispatch(getTransactionThunk())
  }
}

export default connect(mapState, dispatchMapState)(userHome)

/**
 * PROP TYPES
 */
userHome.propTypes = {
  email: PropTypes.string
}
