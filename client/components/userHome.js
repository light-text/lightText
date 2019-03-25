import React from 'react'
import UserInfo from '../components/UserInfo'
import MessageForm from '../components/MessageForm'
import BitcoinsInfo from '../components/BitcoinsInfo'
import {SearchBar} from './'
import Chart from '../components/Chart'
class userHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-m-4 ">
            <div>
              <BitcoinsInfo />
            </div>
          </div>

          <div
            className="col-lg-6 col-m-4"
            style={{backgroundColor: '#e7eaf6'}}
          >
            <div className="myform">
              <SearchBar />
              <MessageForm />
            </div>
          </div>
        </div>
        <UserInfo />
        <Chart />
      </div>
    )
  }
}

export default userHome
