import React from 'react'
import { Link } from 'react-router-dom'

export default function PortionTop(props) {
  return (
    <div className="portion-title">
    <div className="p-t-text">{props.title}</div>
    <div>
      <Link to={props.btn_url}>
        <span>{props.btn_title}</span>
        <i className="fa-solid fa-angle-right"></i>
      </Link>
    </div>
  </div>
  )
}
