import React from 'react'
import {Link} from 'react-router-dom'

export default function FAQs() {
  return (
    <div className="faqs">
      <h1 className="faqsTitle">FAQs</h1>
      <div>
        <h2 className="question">
          What are the advantages of the Lightning Network ?
        </h2>
        <span>
          <p>
            <span className="bold">Instant Payments.</span>
            <span className="description">
              Lightning-fast blockchain payments without worrying about block
              confirmation times. Security is enforced by blockchain
              smart-contracts without creating a on-blockchain transaction for
              individual payments. Payment speed measured in milliseconds to
              seconds.{' '}
            </span>
          </p>
          <p>
            <span className="bold">Scalability.</span>
            <span className="description">
              Capable of millions to billions of transactions per second across
              the network. Capacity blows away legacy payment rails by many
              orders of magnitude. Attaching payment per action/click is now
              possible without custodians.
            </span>
          </p>
          <p>
            <span className="bold">Low Cost.</span>
            <span className="description">
              By transacting and settling off-blockchain, the Lightning Network
              allows for exceptionally low fees, which allows for emerging use
              cases such as instant micropayments.
            </span>
          </p>
          <p>
            <span className="bold">Cross Blockchains.</span>
            <span className="description">
              Cross-chain atomic swaps can occur off-chain instantly with
              heterogeneous blockchain consensus rules. So long as the chains
              can support the same cryptographic hash function, it is possible
              to make transactions across blockchains without trust in 3rd party
              custodians.
            </span>
          </p>
        </span>
      </div>
      <div>
        <h2 className="question">How do I send Bitcoin with LightText ?</h2>
        <span className="description">
          You can send Bitcoin by texting 'SEND' + the amount you want to send +
          the username or number of the person you want to send to. For more
          information go back to the <Link to="/">Home page.</Link>
        </span>
      </div>
    </div>
  )
}
