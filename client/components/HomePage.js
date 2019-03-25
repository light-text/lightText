import React from 'react'
// import {Link} from 'react-router-dom'
import {Signup} from './signUp'
import {AboutUs} from './'
import BitcoinInfo from './BitcoinsInfo'

export default function HomePage() {
  return (
    <div>
      <div id="wholePage">
        <div className="instructionSignUp">
          <div className="instructions">
            <h1 id="work">How It Works</h1>

            <span className="text">
              With LightText you can send Bitcoins by SMS. You have to register
              with us and send money to someone registered. You don't need
              Internet, just a phone number. It is easy, if you can text, you
              can crypto !
            </span>
            <h2 id="lightning">Lightning Wallets ⚡ </h2>
            <h4>with zero configuration</h4>
            <span className="text">
              Unfairly cheap and fast transactions. Bluewallet was the first
              wallet to bring zero configuration, ready to use, user friendly
              Lightning Network Wallets for iOS and Android. Read more about our
              open source.
            </span>
          </div>
        </div>

        <div
          className="iphoneHome"
          style={{
            position: 'relative',
            display: 'inline'
          }}
        >
          <img
            src="/images/lightText.gif"
            style={{
              width: 227,
              height: 490,
              position: 'absolute',
              left: '4%',
              zIndex: '-1'
            }}
          />
          <img
            className="iphoneImg"
            src="/images/iphone.png"
            style={{
              width: 250,
              height: 501
              // background: `url('/images/workflowLightText.gif')`,
              // backgroundSize: '100% 100%',
            }}
          />
        </div>

        <div />
      </div>
      <div className="bottomDiv">
        <div className="bitcoinHome">
          <BitcoinInfo />
        </div>
        <div className="signUp">
          <Signup />
        </div>
      </div>
      <div>
        <AboutUs />
      </div>
    </div>
  )
}
