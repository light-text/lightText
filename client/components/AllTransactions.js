import React from 'react'
import {connect} from 'react-redux'
import {getTransactionThunk} from '../store/transactions'
import {Table} from 'semantic-ui-react'
import Moment from 'react-moment'
import 'moment-timezone'
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
    const receiverTransaction = this.state.receiverTransaction
    const senderTransaction = this.state.senderTransaction
    let receiverTransactionHtml = (
      <tr>
        <td colSpan="3" className="empty">
          No transaction recorded
        </td>
      </tr>
    )
    let senderTransactionHtml = (
      <tr>
        <td colSpan="3" className="empty">
          No transaction recorded
        </td>
      </tr>
    )
    if (receiverTransaction.length > 0) {
      receiverTransactionHtml = receiverTransaction.map((transaction, i) => {
        return (
          <Table.Row key={i}>
            <Table.Cell>{transaction.sender.username}</Table.Cell>

            <Table.Cell>{transaction.amount} satoshis</Table.Cell>

            <Table.Cell>
              <Moment fromNow>{transaction.createdAt}</Moment>
            </Table.Cell>
          </Table.Row>
        )
      })
    }
    if (senderTransaction.length > 0) {
      senderTransactionHtml = senderTransaction.map((transaction, i) => {
        return (
          <Table.Row key={i}>
            <Table.Cell>{transaction.receiver.username}</Table.Cell>

            <Table.Cell>{transaction.amount} satoshis</Table.Cell>

            <Table.Cell>
              <Moment fromNow>{transaction.createdAt}</Moment>
            </Table.Cell>
          </Table.Row>
        )
      })
    }
    return (
      <div className="transactionDiv">
        <h1 id="transactionTable">Your transactions</h1>
        <div className="container-fluid transaction">
          <div className="row">
            <div id="receivedTable" className="col-lg-6 col-m-4 transactions">
              <h3 className="tableTitle">Received</h3>
              <Table collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className="name">From</Table.HeaderCell>
                    <Table.HeaderCell className="amount">
                      Amount
                    </Table.HeaderCell>
                    <Table.HeaderCell className="date">Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {receiverTransactionHtml}
              </Table>
            </div>
            <div id="sentTable" className="col-lg-6 col-m-4 transactions">
              <h3 className="tableTitle">Sent</h3>
              <Table collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className="name">To</Table.HeaderCell>
                    <Table.HeaderCell className="amount">
                      Amount
                    </Table.HeaderCell>
                    <Table.HeaderCell className="date">Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {senderTransactionHtml}
              </Table>
            </div>
          </div>
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

export default connect(mapState, dispatchMapState)(UserInfo)
