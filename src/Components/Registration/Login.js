import React, { useRef, useState } from "react";
import LoginImg from "../../images/loginImg.jpg";
import { useNavigate, Link } from "react-router-dom";
export default function Login(props) {
  const [ShowPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  // input fields ref
  const CredEmailRef = useRef(null);
  const CredPasswordRef = useRef(null);

  //  input fields errors ref
  const CredEmailErrorRef = useRef(null);
  const CredPassErrorRef = useRef(null);
  const LoginsubmitBtnRef = useRef(null);

  //  input fields validate or not
  const [credEmailVerify, setcredEmailVerify] = useState(false);
  const [credPassVerify, setcredPassVerify] = useState(false);

  // const [IsLoggedin, setIsLoggedin] = useState(false);

  function HandleEmailFields(e) {
    let value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let CheckEmail = emailRegex.test(value);

    if (!CheckEmail) {
      CredEmailErrorRef.current.innerText = "Invalid Email Address";
      setcredEmailVerify(false);
    } else {
      CredEmailErrorRef.current.innerText = null;
      setcredEmailVerify(true);
    }
  }

  function HandlePassFields(e) {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let CheckPass = passwordRegex.test(value);

    if (!CheckPass) {
      CredPassErrorRef.current.innerText =
        "At least one lowercase, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &) And Minimum length of 8 characters";
      setcredPassVerify(false);
    } else {
      CredPassErrorRef.current.innerText = null;
      setcredPassVerify(true);
    }
  }

  const HandleLoginForm = async (e) => {
    e.preventDefault();
    if (credEmailVerify && credPassVerify) {
      LoginsubmitBtnRef.current.classList.add("active");
      LoginsubmitBtnRef.current.innerHTML =
        "Logining <i class='fa-light fa-sync  fa-spin'></i>";
      const setUserData = {
        email: CredEmailRef.current.value,
        password: CredPasswordRef.current.value,
      };
      const fetchResult = await fetch("http://localhost:8000/api/login", {
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
          LoginsubmitBtnRef.current.classList.remove("active");
          LoginsubmitBtnRef.current.innerHTML = "Login Now";

          if (data.success) {
            props.ShowToast(
              "fa-check-circle igreen",
              "You are Logged In Successfully"
            );
            localStorage.setItem("token", data.token);
            localStorage.setItem(
              "user_data",
              `${data.data.name},${data.data.email}`
            );
            navigate("/",{replace:true});
          } else {
            props.ShowToast(
              "fa-xmark-circle ired",
              "Invalid Credentials",
              data.msg.email ?? data.msg.password
            );
          }
        })
        .catch((e) => {
          LoginsubmitBtnRef.current.innerHTML = "Login Now";
          props.ShowToast("fa-xmark-circle ired", "Server Error ", "Server sending no response.");        });
    }
  };

  var user_data = localStorage.getItem("user_data");
  if (user_data) {
    var username = user_data.split(",");
  }

  function PasswordToggler() {
    setShowPass(!ShowPass);
  }
  const Capitalize = (str)=>{
str = str.split(" ")
const text = str.map(word => {
  if (word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);

})
const capitalizedText = text.join(' ');
return capitalizedText;

}
  return (
    <>
      <div className="reg-wrapper">
        <div className="reg-container">
          <div className="reg-content">
            <div className="reg-content-head">
              <span>Welcome Back,</span>
              <h2 className="">
                {user_data ? Capitalize(username[0]): "New Code Hunter"}
              </h2>
              <p>
                login your account with correct credentials and stay up-to-date
                with the latest news and insights.
              </p>
              <div className="submit-btn">
                <button type="submit" className="outh-toggle">
                  <i className="fa-brands fa-google text-light me-1"></i>
                  Login Via Google
                </button>
              </div>
              <div className="or"></div>
            </div>
            <form
              method="post"
              onSubmit={HandleLoginForm}
              className=""
            >
              <div className="input-box">
                <label htmlFor="login_email">Email Address</label>
                <input
                  onChange={HandleEmailFields}
                  ref={CredEmailRef}
                  type="email"
                  id="login_email"
                  name="login_email"
                  autoComplete="email"
                />
                <p ref={CredEmailErrorRef}></p>
              </div>
              <div className="input-box">
                <label htmlFor="login_pass">Password</label>
                <input
                  onChange={HandlePassFields}
                  ref={CredPasswordRef}
                  type={ShowPass ? "text" : "password"}
                  id="login_pass"
                  name="login_pass"
                  autoComplete="current-password"
                />
                <p ref={CredPassErrorRef}></p>
                <span
                  onClick={PasswordToggler}
                  className={`${ShowPass ? "" : "hidepass"} showpass`}
                >
                  <i
                    className={`fa-solid fa-eye${ShowPass ? "" : "-slash"} `}
                  ></i>
                </span>
              </div>
              <div className="reset-wrapper input-box">
                <Link className="reset-link" to="/login/verify_reset">
                  Forget Password
                </Link>
                <div className="reg-already" style={{ marginBottom: 0 }}>
                  Don't have an account<Link to="/signup">Register Here</Link>
                </div>
              </div>
              <div className="submit-btn ">
                {credEmailVerify && credPassVerify ? (
                  <button
                    type="submit"
                    ref={LoginsubmitBtnRef}
                    className="signupbtn"
                  >
                    Login Your Account
                  </button>
                ) : (
                  <button
                    type="submit"
                    ref={LoginsubmitBtnRef}
                    className="signupbtn disabled"
                  >
                    Login Your Account
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="reg-banner">
            <img src={LoginImg} />
          </div>
        </div>
      </div>
    </>
  );
}
