import React, { useRef, useState } from "react";

export default function Message(props) {
  const MsgNameRef = useRef(null);
const MsgEmailRef = useRef(null);
const MsgMsgRef = useRef(null);
const MsgSubmitBtnBoxRef = useRef(null);

async function HandleMessage(e) {
  e.preventDefault();
  MsgSubmitBtnBoxRef.current.innerHTML =
    "<i class='fa-regular fa-sync fa-spin'></i>";

  if (
    MsgNameRef.current.value === "" ||
    MsgEmailRef.current.value === "" ||
    MsgMsgRef.current.value === ""
  ) {
    props.ShowToast(
      "fa-xmark-circle ired",
      "Empty Fields",
      "Please fill in all the required fields."
    );
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(MsgEmailRef.current.value);

  if (MsgNameRef.current.value.length > 100) {
    props.ShowToast("fa-xmark-circle ired", "Maximum 100 Words Required");
    return;
  }

  if (!isValidEmail) {
    props.ShowToast("fa-xmark-circle ired", "Invalid Email Address");
    return;
  }

  if (MsgMsgRef.current.value.length > 250) {
    props.ShowToast("fa-xmark-circle ired", "Maximum 250 Words Required");
    return;
  }

  const MsgData = new FormData();
  MsgData.append("name", MsgNameRef.current.value);
  MsgData.append("email", MsgEmailRef.current.value);
  MsgData.append("msg", MsgMsgRef.current.value);

  try {

await fetch("http://localhost:8000/api/send-message", {
      method: "POST",
      body:MsgData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.success) {
     
          if(data.msg.email){
            props.ShowToast("fa-xmark-circle ired","Email Error",data.msg.email);
          }
          if(data.msg.name){
            props.ShowToast("fa-xmark-circle ired","Full Name Error",data.msg.name);
          }
          if(data.msg.msg){
            props.ShowToast("fa-xmark-circle ired","Message Error",data.msg.msg);
          }
        } else {
          props.ShowToast("fa-check-circle igreen","Message Sended","Your message sucessfully sended to the admin.");
        }
      });
  } catch (error) {
            props.ShowToast("fa-xmark-circle ired","Server Error","check console in your browser");
            console.log("Error creating review:", error);
  }
  MsgSubmitBtnBoxRef.current.innerHTML = "Send Message";
  MsgEmailRef.current.value= ""
  MsgMsgRef.current.value= ""
  MsgNameRef.current.value= ""

}

  return (
    <div
    style={{ display:props.IsActive ? "none" : "flex" }}
    className="contact-box"
  >
    <div className="review-contact-head">
      <h1>Write a Message</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores,
        iusto?
      </p>
    </div>
    <form onSubmit={HandleMessage}>
      <div className="input-grid">
        <div className="input-box">
          <label htmlFor="msg_name">First Name</label>
          <input ref={MsgNameRef} type="text" id="msg_name" />
        </div>

      </div>
      <div className="input-box">
        <label htmlFor="msg_email">Email Address</label>
        <input ref={MsgEmailRef} type="email" id="msg_email" />
      </div>
      <div className="input-box">
        <label htmlFor="msg_review">Write a Message to Admin</label>
        <textarea ref={MsgMsgRef} id="msg_review" cols="30" rows="5"></textarea>
      </div>
      <div className="input-button">
        <button ref={MsgSubmitBtnBoxRef}>Send Message</button>
      </div>
    </form>
  </div>  )
}
