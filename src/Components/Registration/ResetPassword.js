import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plane from "../../images/plane.png";
export default function ResetPassword(props) {
  const { token } = useParams();

  const navigate = useNavigate();

  const [ShowRePass, setShowRePass] = useState(false);
  const [ShowNewPass, setShowNewPass] = useState(false);
  const [Access, setAccess] = useState(false);

  //  input fields validate or not
  const [NewPassVerify, setNewPassVerify] = useState(false);
  const [RePassVerify, setRePassVerify] = useState(false);
  const ResetPassFieldRef = useRef(null);
  const RePassFieldRef = useRef(null);
  const submitBtn = useRef(null);
  const ResetPassBtnRef = useRef(null);
  const NewPassErrRef = useRef(null);
  const RePassErrRef = useRef(null);

  useEffect(() => {
    if (token.length == 40) {
      localStorage.setItem("reset_token", token);
      setAccess(true);
    } else {
      navigate("/login",{replace:true});
      props.ShowToast(
        "fa-xmark-circle ired",
        "Error",
        "You can't access this page without email verification"
      );
    }
  }, []);
  function HandlePassFields(e) {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let CheckPass = passwordRegex.test(value);

    if (!CheckPass) {
      NewPassErrRef.current.innerText =
        "At least one lowercase, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &) And Minimum length of 8 characters";
      setNewPassVerify(false);
    } else {
      NewPassErrRef.current.innerText = null;
      setNewPassVerify(true);
    }
  }

  function HandleRePassFields(e) {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let CheckPass = passwordRegex.test(value);

    if (!CheckPass) {
      RePassErrRef.current.innerText =
        "At least one lowercase, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &) And Minimum length of 8 characters";
      setRePassVerify(false);
    } else {
      RePassErrRef.current.innerText = null;
      setRePassVerify(true);
    }
  }

  async function HandleResetPass(e) {
    e.preventDefault();
    if (NewPassVerify && RePassVerify) {
      if (ResetPassFieldRef.current.value != RePassFieldRef.current.value) {
        return props.ShowToast(
          "fa-xmark-circle ired",
          "Passwords Not Matched",
          "Password fields does not matched."
        );
      } else {
        ResetPassBtnRef.current.innerHTML =
          "<i class='fa-light fa-sync fa-spin'></i>";
        submitBtn.current.style.width = "15%";
        await fetch(
          `http://localhost:8000/api/reset/${
            localStorage.getItem("reset_token") != undefined
              ? localStorage.getItem("reset_token")
              : token
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: ResetPassFieldRef.current.value }),
          }
        )
          .then((Response) => {
            return Response.json();
          })
          .then((Res) => {
            console.log(Res);
            submitBtn.current.style.width = "50%";
            if (Res.success) {
              ResetPassBtnRef.current.innerHTML =
                "Password Reset <i class='fa-solid fa-check-circle'></i>";
              localStorage.removeItem("reset_token");
              props.ShowToast(
                "fa-check-circle igreen",
                "Password Successfully Reset",
                "Your password successfully reset, Now go to login with new password"
              );
            } else {
              ResetPassBtnRef.current.innerHTML = "Reset Password";
              props.ShowToast(
                "fa-xmark-circle ired",
                "Request Expired",
                Res.msg.password ?? Res.msg
              );
            }
          })
          .catch((e) => {
            submitBtn.current.style.width = "50%";

            ResetPassBtnRef.current.innerHTML = "Password Reset ";
            props.ShowToast(
              "fa-xmark-circle ired",
              "Server Error ",
              "Server sending no response."
            );
          });
      }
    } else {
      props.ShowToast(
        "fa-xmark-circle ired",
        "Invalid Password pattern",
        "Password fields are not Validate."
      );
    }
  }
  function NewPasswordToggler() {
    setShowNewPass(!ShowNewPass);
  }
  function RePasswordToggler() {
    setShowRePass(!ShowRePass);
  }
  return (
    Access && (
      <div className="reset-pass-wrapper">
        <div className="reset-pass-container">
          <div className="reset-pass-content">
            <div className="img">
              <img src={plane} loading="lazy" alt="" />
            </div>
            <h2 className="">Reset a New Password</h2>
            <p>
              Please enter your email address below to recieve your user and a
              new password.
            </p>
          </div>
          <form method="post" onSubmit={HandleResetPass} className="">
            <div className="input-box">
              <label htmlFor="new_pass">New Password</label>
              <input
                onChange={HandlePassFields}
                ref={ResetPassFieldRef}
                type={ShowNewPass ? "text" : "password"}
                id="new_pass"
                name="new_pass"
                required
              />
              <p ref={NewPassErrRef}></p>
              <span
                onClick={NewPasswordToggler}
                className={`${ShowNewPass ? "" : "hidepass"} showpass`}
              >
                <i
                  className={`fa-solid fa-eye${ShowNewPass ? "" : "-slash"} `}
                ></i>
              </span>
            </div>
            <div className="input-box">
              <label htmlFor="new_re_pass">Repeat Password</label>
              <input
                onChange={HandleRePassFields}
                ref={RePassFieldRef}
                type={ShowRePass ? "text" : "password"}
                id="new_re_pass"
                name="new_re_pass"
                required
              />
              <p ref={RePassErrRef}></p>
              <span
                onClick={RePasswordToggler}
                className={`${ShowRePass ? "" : "hidepass"} showpass`}
              >
                <i
                  className={`fa-solid fa-eye${ShowRePass ? "" : "-slash"} `}
                ></i>
              </span>
            </div>
            <div ref={submitBtn} className="submit-btn">
              <button type="submit" ref={ResetPassBtnRef}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
