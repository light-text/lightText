import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTransactionThunk} from '../store/transactions'
import TransactionsTable from '../components/Transactions'

/**
 * COMPONENT
 */
export class UserInfo extends React.Component {
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
    console.log(this.props.history.transaction, 'Lets hope')
    return (
      <div>
        <TransactionsTable transactions={this.state} userInfo={this.props} />
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

export default connect(mapState, dispatchMapState)(UserInfo)

/**
 * PROP TYPES
 */
// UserInfo.propTypes = {
//   email: PropTypes.string
// }
