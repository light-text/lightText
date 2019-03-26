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
              Internet, just a phone number.
            </span>
            <h2 id="lightning">Lightning Wallets ⚡ </h2>
            <h4>with zero configuration</h4>
            <span className="text">
              Unfairly cheap and fast transactions. LightText brings zero
              configuration, ready to use, user friendly Lightning Network
              Wallets for iOS and Android. Read more about our open source.
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
            style={{width: 250, height: 501}}
          />
        </div>
        <div />
      </div>
      <div className="centralDiv">
        <div className="signUp">
          <Signup />
        </div>
        <div className="cryptoEasy">
          <span id="text">It is easy if you can text, you can crypto !</span>
        </div>
      </div>
      <div className="bottomDiv">
        <div className="bitcoinHome">
          <BitcoinInfo />
        </div>
      </div>
      <div className="lastDiv">
        <div>
          <iframe
            frameBorder="0"
            scrolling="no"
            src="https://interactive-bitcoin-price-chart-yenswahhtb.now.sh/"
            style={{width: '100%', height: '550px', overflow: 'hidden'}}
          />
        </div>
      </div>
      <div>
        <AboutUs />
      </div>
    </div>
  )
}
