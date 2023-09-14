import React from 'react'
import Message from '../Assets/Message'

export default function Contact(props) {
  return (
    <>
    <div className='contact-wrapper'>

      <div className="contact-container">
   <Message ShowToast={props.ShowToast} IsActive={false}/>
        </div>
        <div className='contact-details'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28934.007297904638!2d67.06798845!3d24.974587999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb340e59b6b225b%3A0x1951829acb486c7e!2sNorth%20Karachi%20Twp%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh!5e0!3m2!1sen!2s!4v1682611851895!5m2!1sen!2s" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </div>
    </>)
}
