import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTransactionThunk} from '../store/transactions'
import Moment from 'react-moment'
import 'moment-timezone'
/**
 * COMPONENT
 */
export class userHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverTransaction: [],
      senderTransaction: []
    }
  }
  async componentDidMount() {
    await this.props.getTransaction()
    this.setState({
      receiverTransaction: this.props.history.transaction.receiver,
      senderTransaction: this.props.history.transaction.sender
    })
  }
  render() {
    const user = this.props.user
    return (
      <div>
        <div id="iphone">
          <h3 id="welcome">Welcome, {user.username}</h3>
          <p className="balance">Your balance : {user.balance} satoshis.</p>
          <div>
            <div className="transactions">
              Your transactions :
              <div>
                Received from:
                {this.state.receiverTransaction.map(element => (
                  <li className="userList" key={element.id}>
                    {element.sender.username}, amount : {element.amount},
                    <Moment fromNow>{element.createdAt}</Moment>
                  </li>
                ))}
              </div>
              <div>
                Sent to:
                {this.state.senderTransaction.map(element => (
                  <li className="userList" key={element.id}>
                    {element.receiver.username}, amount : {element.amount},
                    <Moment fromNow>{element.createdAt}</Moment>
                  </li>
                ))}
              </div>
            </div>
          </div>
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
    history: state.transactions
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
