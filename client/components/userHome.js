import React from 'react'
import UserInfo from '../components/UserInfo'
import MessageForm from '../components/MessageForm'
import BitcoinsInfo from '../components/BitcoinsInfo'
import {SearchBar} from './'

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

          <div className="col-lg-6 col-m-4 ">
            <div className="myform">
              <SearchBar />
              <MessageForm />
            </div>
          </div>
        </div>

        <div>
          <iframe
            frameBorder="0"
            scrolling="no"
            src="https://interactive-bitcoin-price-chart-yenswahhtb.now.sh/"
            style={{width: '100%', height: '550px', overflow: 'hidden'}}
          />
        </div>
        <UserInfo />
      </div>
    )
  }
}

export default userHome
