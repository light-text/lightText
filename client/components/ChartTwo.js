import React from 'react'
import {connect} from 'react-redux'
import {Bar, Pie, Polar} from 'react-chartjs-2'
import {getTransactionThunk} from '../store/transactions'
class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.createChart = this.createChart.bind(this)
  }
  async componentDidMount() {
    await this.props.getTransactions()
  }

  createChart(data, status) {
    return {
      labels: [...Object.keys(data)],
      datasets: [
        {
          label: status,
          backgroundColor: [
            '#616f39',
            '#a7d129',
            '#f8eeb4',
            'rgba(153, 102, 255, 0.2)',
            '#62374e'
          ],
          data: [...Object.values(data)]
        }
      ]
    }
  }

  render() {
    const sendData = {}

    !!this.props.history.transaction.receiver &&
      this.props.history.transaction.receiver.forEach(user => {
        const username = user.sender.username
        !sendData[username]
          ? (sendData[username] = user.amount)
          : (sendData[username] += user.amount)
      })

    return (
      <div>
        <Pie data={this.createChart(sendData, 'Spending')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
