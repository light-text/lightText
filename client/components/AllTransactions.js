import React from 'react'
import {Table} from 'semantic-ui-react'
import Moment from 'react-moment'
import 'moment-timezone'
import {connect} from 'react-redux'
import {getTransactionThunk} from '../store/transactions'

class AllTransactions extends React.Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    await this.props.getTransactions()
  }

  render() {
    console.log(this.props.history)
    const receiverTransaction = this.props.history.transaction.receiver
    const senderTransaction = this.props.history.transaction.sender

    var receiverTransactionHtml = (
      <tr>
        <td colSpan="3" className="empty">
          No transaction recorded
        </td>
      </tr>
    )
    var senderTransactionHtml = (
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

const mapStateToProps = state => {
  return {history: state.transactions}
}
const mapDispatchToProps = dispatch => {
  return {getTransactions: () => dispatch(getTransactionThunk())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions)
