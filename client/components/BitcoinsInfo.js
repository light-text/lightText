import React from 'react'
import {input} from 'semantic-ui-react'
export default class BitcoinInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      date: '',
      rate: '',
      value: 1
    }
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    var that = this
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var hours = new Date().getHours()
    var min = new Date().getMinutes()
    var sec = new Date().getSeconds()
    that.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    })
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          rate: responseJson.bpi.USD.rate_float
        })
        // console.log('eur to bit : ' + responseJson.bpi.EUR.rate)
      })
      .catch(error => {
        console.error(error)
      })
  }
  onChange(e) {
    const re = /^[0-9\b]+$/
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({value: e.target.value})
    }
  }
  render() {
    const result = this.state.rate * this.state.value
    return (
      <div>
        <h1 id="btcInfo">Bitcoins Information</h1>
        <p id="update">Last Update : {this.state.date}</p>
        <p id="today">Today's rate : 1 Bitcoin = {this.state.rate} USD</p>
        <p id="convert">Convert your bitcoins to dollars : </p>
        <p />
        <div className="ui input focus">
          <input
            style={{marginLeft: '55px'}}
            type="text"
            name="convert"
            placeholder="Convert"
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <p className="result"> = {result} USD</p>
      </div>
    )
  }
}
