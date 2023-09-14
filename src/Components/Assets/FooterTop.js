import React from 'react'
import { Link } from 'react-router-dom';

export default function FooterTop() {
  return (
    <div className="footer_top">
        <div>
            <small>Are you ready for registration</small>
            <h2>Enter your email Address and get started for free</h2>
        </div>
        <div>
            <Link to="signup">Register now</Link><Link to="/login">Welcome back</Link>
        </div>
    </div>
      )
}
