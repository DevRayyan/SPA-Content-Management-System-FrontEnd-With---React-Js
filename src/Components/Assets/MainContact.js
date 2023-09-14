import React, { useEffect } from "react";
import { useState } from "react";
import Message from "./Message";
import Review from "./Review";
export default function MainContact(props) {
  useEffect(() => {
    review();
  }, []);

  const [IsActive, setIsActive] = useState(true);

  function review() {
    setIsActive(true);
  }
  function message() {
    setIsActive(false);
  }

  return (
    <>
      <div className="review-contact-container">
        <div className="contact-switches">
          <div className={`switcher ${IsActive ? "active" : ""}  review`}>
            <span></span>
            <button onClick={review} type="button">
              Review
            </button>
          </div>
          <div className={`switcher  ${IsActive ? "" : "active"} message`}>
            <span></span>
            <button onClick={message} type="button">
              Message
            </button>
          </div>
        </div>
   <Review ShowToast={props.ShowToast} IsActive={IsActive}/>
   <Message ShowToast={props.ShowToast} IsActive={IsActive}/>
      </div>
    </>
  );
}
