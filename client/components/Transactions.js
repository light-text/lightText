import React from 'react'
import {Table} from 'semantic-ui-react'
import Moment from 'react-moment'
import 'moment-timezone'

const TransactionsTable = props => {
  const receiverTransaction = props.transactions.receiverTransaction
  const senderTransaction = props.transactions.senderTransaction

  return (
    <div className="container-fluid transaction">
      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {receiverTransaction.map((transaction, i) => {
          return (
            <Table.Row key={i}>
              <Table.Cell>{transaction.sender.username}</Table.Cell>
              <Table.Cell>{transaction.amount} satoshis</Table.Cell>
              <Table.Cell>
                <Moment fromNow>{transaction.createdAt}</Moment>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table>

      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {senderTransaction.map((transaction, i) => {
          return (
            <Table.Row key={i}>
              <Table.Cell>{transaction.receiver.username}</Table.Cell>
              <Table.Cell>{transaction.amount} satoshis</Table.Cell>
              <Table.Cell>
                <Moment fromNow>{transaction.createdAt}</Moment>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table>
    </div>
  )
}

export default TransactionsTable
