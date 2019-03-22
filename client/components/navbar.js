import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <Link to="/">
      <div className="container">
        <img className="imageLogo" src="/images/lightbulbblack.png" />

        <h1 className="title">LightText</h1>
      </div>
    </Link>

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div className="link">
            <Link className="links" to="/">
              My profil
            </Link>
            <Link className="links" to="#" onClick={handleClick}>
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="link">
            <Link className="links" to="/login">
              Login
            </Link>
            {/* <Link className="links" to="/signup">
              Sign Up
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
