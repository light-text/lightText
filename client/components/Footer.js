import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/FAQs">
          FAQs
        </Link>
      </div>
      <div>
        <p> © LightText All Rights Reserved. 2019 </p>
      </div>
    </div>
  )
}
