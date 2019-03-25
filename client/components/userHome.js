import React from 'react'
import UserInfo from '../components/UserInfo'
import MessageForm from '../components/MessageForm'
class userHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-m-4 ">
            <div>
              <h1>Hello</h1>
            </div>
          </div>

          <div className="col-lg-6 col-m-4 ">
            <div className="myform">
              <MessageForm />
            </div>
          </div>

          <div className="col-lg-6 col-m-4 ">
            <UserInfo />
          </div>
        </div>
      </div>
    )
  }
}

export default userHome
