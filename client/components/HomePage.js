import React from 'react'
// import {Link} from 'react-router-dom'
import {Signup} from './signUp'

export default function HomePage() {
  return (
    <div id="wholePage">
      <div className="instructionSignUp">
        <div className="instructions">
          <h3>How It Works</h3>

          <span className="text">
            With LightText you can send Bitcoins by SMS. You have to register
            with us and send money to someone registered. You don't need
            Internet, just a phone number. It is easy, if you can text, you can
            crypto !
          </span>
        </div>
        <div className="signUp">
          <Signup />
        </div>
      </div>
      <div className="iphoneHome">
        <img
          className="iphoneImg"
          src="/images/iphone.png"
          style={{width: 250, height: 501}}
        />
      </div>
    </div>
  )
}
