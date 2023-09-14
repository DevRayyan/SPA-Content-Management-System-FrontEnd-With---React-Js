import React, { useRef, useState } from "react";
import RegisterImg from "../../images/registerImg.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function Registration(props) {
  const navigate = useNavigate();

  // input fields ref
  const FullnameRef = useRef(null);
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);

  //  input fields errors ref
  const fullnameErrorRef = useRef(null);
  const EmailErrorRef = useRef(null);
  const PassErrorRef = useRef(null);
  const submitBtnRef = useRef(null);

  //  input fields validate or not
  const [nameVerify, setnameVerify] = useState(false);
  const [emailVerify, setemailVerify] = useState(false);
  const [passVerify, setpassVerify] = useState(false);

  const [ShowPass, setShowPass] = useState(false);
  function PasswordToggler() {
    setShowPass(!ShowPass);
  }

  function HandleNameFields(e) {
    let value = e.target.value;
    if (value.length > 100) {
      fullnameErrorRef.current.innerText =
        "Length Should be less than 99 characters.";
      setnameVerify(false);
    } else {
      fullnameErrorRef.current.innerText = null;
      setnameVerify(true);
    }
  }
  function HandleEmailFields(e) {
    let value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let CheckEmail = emailRegex.test(value);

    if (!CheckEmail) {
      EmailErrorRef.current.innerText = "Invalid Email Address";
      setemailVerify(false);
    } else {
      EmailErrorRef.current.innerText = null;
      setemailVerify(true);
    }
  }
  function HandlePassFields(e) {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let CheckPass = passwordRegex.test(value);

    if (!CheckPass) {
      PassErrorRef.current.innerText =
        "At least one lowercase, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &) And Minimum length of 8 characters";
      setpassVerify(false);
    } else {
      PassErrorRef.current.innerText = null;
      setpassVerify(true);
    }
  }

  const HandleSignupForm = async (e) => {
    e.preventDefault();
    if (nameVerify && emailVerify && passVerify) {
      submitBtnRef.current.classList.add("active");
      submitBtnRef.current.innerHTML =
        "Sending <i class='fa-light fa-sync  fa-spin'></i>";
      const setUserData = {
        name: FullnameRef.current.value,
        email: EmailRef.current.value,
        password: PasswordRef.current.value,
      };
    await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setUserData),
      })
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          console.log(data);
          submitBtnRef.current.classList.remove("active");
          submitBtnRef.current.innerHTML = "Signup Now";
          if (data.success) {
            props.ShowToast(
              "fa-check-circle igreen",
              "Registration Successfull",
              "Are you ready to login in your personal account."
            );
            localStorage.setItem("reg_token", data.token);
            localStorage.setItem("usr-pln", "activated");
            setTimeout(() => {
              navigate("/login",{replace:true});
            }, 2000);
          } else {
            props.ShowToast(
              "fa-xmark-circle ired",
              "Registration Failed",
              data.msg.name ?? data.msg.email ?? data.msg.password
            );
          }
        })
        .catch((e) => {
          submitBtnRef.current.innerHTML = "Signup Now";
          props.ShowToast("fa-xmark-circle ired", "Server Error ", "Server sending no response.");
        });
    }
  };

  return (
    <>
      <div className="reg-wrapper">
        <div className="reg-container">
          <div className="reg-banner">
            <img src={RegisterImg} />
          </div>
          <div className="reg-content">
            <div className="reg-content-head">
              <span> Hey there,</span>
              <h2 className="">Register Your Account</h2>
              <p>
                Sign up for our blog and stay up-to-date with the latest news
                and insights.
              </p>
              <div className="submit-btn">
                <button type="submit" className="outh-toggle">
                  <i className="fa-brands fa-google text-light me-1"></i>
                  Login Via Google
                </button>
              </div>
              <div className="or"></div>
            </div>
            <form method="post" onSubmit={HandleSignupForm} className="">
              <div className="input-box">
                <label htmlFor="fullname">Full Name</label>
                <input
                  onChange={HandleNameFields}
                  ref={FullnameRef}
                  type="text"
                  placeholder="Enter your full name"
                  id="fullname"
                  autoComplete="name"
                  name="fullname"
                  required
                />
                <p ref={fullnameErrorRef}></p>
              </div>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  onChange={HandleEmailFields}
                  ref={EmailRef}
                  type="email"
                  id="email"
                  placeholder="Enter  your email address"
                  autoComplete="email"
                  name="email"
                  required
                />
                <p ref={EmailErrorRef}></p>
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  onChange={HandlePassFields}
                  ref={PasswordRef}
                  type={ShowPass ? "text" : "password"}
                  id="password"
                  placeholder="Enter a strong password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
                <span
                  onClick={PasswordToggler}
                  className={`${ShowPass ? "" : "hidepass"} showpass`}
                >
                  <i
                    className={`fa-solid fa-eye${ShowPass ? "" : "-slash"} `}
                  ></i>
                </span>
                <p ref={PassErrorRef}></p>
              </div>
              <div className="checkbox-wrapper input-box">
                <div className="check-box">
                  <input type="checkbox" id="rememberMe" checked />
                  <label htmlFor="rememberMe">Terms & Conditions</label>
                </div>
                <div className="reg-already">
                  Already have account<Link to="/login">Login here</Link>
                </div>
              </div>
              <div className="submit-btn">
                {nameVerify && emailVerify && passVerify ? (
                  <button
                    type="submit"
                    ref={submitBtnRef}
                    className="signupbtn"
                  >
                    Signup Now
                  </button>
                ) : (
                  <button
                    type="submit"
                    ref={submitBtnRef}
                    className="signupbtn disabled"
                  >
                    Signup Now
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
