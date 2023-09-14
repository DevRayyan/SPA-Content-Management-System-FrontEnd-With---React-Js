import React from 'react'
import { useState } from 'react'

export default function Toast(props) {
  const [toastShow, settoastShow] = useState(false)
  function HideToast() {
    props.removeToast(null)
  }
  return (
    <>
      {props.toastData && <div className={`toast ${toastShow && "hide"}`}>
        <i className={`fa-solid ${props.toastData.icon}`}></i>
        <div className='toast-content'>
          <p>{props.toastData.title}</p>
          <small>{props.toastData.msg}</small>
        </div>
        <div>
          <button onClick={HideToast}><i className='fa-solid fa-xmark'></i></button>
        </div>
      </div>
      }
    </>
  )
}
