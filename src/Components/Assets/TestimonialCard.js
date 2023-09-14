import React from 'react'
import { format } from 'date-fns';

export default function TestimonialCard(props) {
 const  ImgLink = `http://localhost:8000${props.data.image}`; 
  const formattedDate = format(new Date(props.data.created_at), 'dd MMMM, yyyy h:mm a');

  return (

    <div className="testimonial-card">
    <div className="intro">
      <img
        src={ImgLink}
        alt="testimonials 1"
      />
      <div>
        <h6>{props.data.name}</h6>
        <small>{props.data.occupation}</small>
      </div>
    </div>
    <p>
    {props.data.msg}</p>
    <div className="date">
      <span>{formattedDate}</span>
    </div>
  </div>  )
}
