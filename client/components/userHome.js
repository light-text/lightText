import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const userHome = props => {
  const {user} = props

  return (
    <div>
      <div id="iphone">
        <h3 id="welcome">Welcome, {user.username}</h3>
        <p id="balance">Your balance : {user.balance} satoshis.</p>
        <p id="transactions">Your transactions : </p>
        <img
          id="iphoneImage"
          style={{width: 250, height: 501}}
          src="/images/iphone.png"
        />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(userHome)

/**
 * PROP TYPES
 */
userHome.propTypes = {
  email: PropTypes.string
}
