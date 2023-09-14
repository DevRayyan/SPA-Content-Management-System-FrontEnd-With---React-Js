import React, { useRef, useState } from "react";
import plane from "../../images/plane.png";
export default function VerifyResetPassword(props) {
  const LoginEmailRef = useRef(null);
  const VerifyEmailForPassRef = useRef(null);
  const submitBtn = useRef(null);

  const [BeforeRequestSend,setBeforeRequestSend] = useState(true); 

  async function HandleResetPass(e) {
    e.preventDefault();
    submitBtn.current.style.width = "15%";

    VerifyEmailForPassRef.current.innerHTML =
      "<i class='fa-light fa-sync fa-spin'></i>";
    await fetch(`http://localhost:8000/api/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: LoginEmailRef.current.value }),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((Res) => {
        submitBtn.current.style.width = "50%";
        console.log(Res);
        if (Res.success) {
          setBeforeRequestSend(false)
          VerifyEmailForPassRef.current.innerHTML = "Reset Link Sended <i class='fa-solid fa-check-circle'></i>";
          props.ShowToast(
            "fa-check-circle igreen",
            Res.msg,
            "Check your email address we will just send a password reset link on it."
            );
          } else {
            VerifyEmailForPassRef.current.innerHTML = "Send Request";
            props.ShowToast(
              "fa-xmark-circle ired",
             "Invalid Email Address",
              Res.msg.email??Res.msg
            );
          }
      })
      .catch((e) => {
        submitBtn.current.style.width = "50%";
        VerifyEmailForPassRef.current.innerHTML = "Send Request";
        props.ShowToast("fa-xmark-circle ired", "Server Error ", "Server sending no response.");     });
  }

  return (
    <>
      <div className="reset-pass-wrapper">
        <div className="reset-pass-container">
          <div className="reset-pass-content">
            <div className="img">
              <img src={plane} alt="" />
            </div>
            <h2 className="">{BeforeRequestSend === false ? "Check your Email Address" :"Forget Your Password?"}</h2>
            <p>
            {BeforeRequestSend === false ? `We will sending a password reset link  on your email address` :"Please enter correct your email address below to recieve a new password reset link."}
         
            </p>
          </div>
{
  BeforeRequestSend &&
   <form method="post" onSubmit={HandleResetPass}>
            <div className="input-box">
              <label htmlFor="verify_email">Verify Email Address</label>
              <input
                ref={LoginEmailRef}
                type="email"
                id="verify_email"
                name="verify_email"
                required
              />
            </div>
            <div ref={submitBtn} className="submit-btn">
              <button type="submit" ref={VerifyEmailForPassRef}>
                Send Request
              </button>
            </div>
          </form>
}
        </div>
      </div>
    </>
  );
}
