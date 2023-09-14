import React, { useEffect, useRef, useState } from "react";

export default function Information(props) {
  const [ShowProPass, setShowProPass] = useState(false);
  const [ShowReProPass, setShowReProPass] = useState(false);

  const [ProPassVerify, setProPassVerify] = useState(false);
  const [ReProPassVerify, setReProPassVerify] = useState(false);


  const ProPassFieldRef = useRef(null);
  const ReProPassFieldRef = useRef(null);
  const ProNameFieldRef = useRef(null);
  const ProEmailFieldRef = useRef(null);

  const NewProPassErrRef = useRef(null);
  const NewReProPassErrRef = useRef(null);
  const ProNameErrRef = useRef(null);
  const ProEmailErrRef = useRef(null);
  // password change btn
  const ProsubmitBtn = useRef(null);
  const ProPassBtnRef = useRef(null);

  // Email and name change btn
  const ProEmailsubmitBtn = useRef(null);
  const ProEmailBtnRef = useRef(null);

  function HandleProPassField(e) {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let CheckPass = passwordRegex.test(value);

    if (!CheckPass) {
      NewProPassErrRef.current.innerText =
        "At least one lowercase, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &) And Minimum length of 8 characters";
      setProPassVerify(false);
    } else {
      NewProPassErrRef.current.innerText = null;
      setProPassVerify(true);
    }
  }

  function HandleReProPassField(e) {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let CheckPass = passwordRegex.test(value);

    if (!CheckPass) {
      NewReProPassErrRef.current.innerText =
        "At least one lowercase, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &) And Minimum length of 8 characters";
      setReProPassVerify(false);
    } else {
      NewReProPassErrRef.current.innerText = null;
      setReProPassVerify(true);
    }
  }
  async function HandleChangePass(e) {
    e.preventDefault();
    ProPassBtnRef.current.innerHTML =
      "<i class='fa-light fa-sync fa-spin'></i>";
    ProPassBtnRef.current.style.width = "15%";
    if (ProPassVerify && ReProPassVerify) {
      if (ProPassFieldRef.current.value == ReProPassFieldRef.current.value) {
        await fetch(`http://localhost:8000/api/change-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ password: ProPassFieldRef.current.value }),
        })
          .then((Response) => {
            return Response.json();
          })
          .then((Res) => {
            if (Res.success) {
              ProPassBtnRef.current.innerHTML =
                "Password Changed <i class='fa-solid fa-check-circle'></i>";
              props.ShowToast(
                "fa-check-circle igreen",
                "Password Successfully Changed",
                "Your password successfully change, Now go to login with a new password"
              );
            } else {
              ProPassBtnRef.current.innerHTML = "Change Password";
              props.ShowToast(
                "fa-xmark-circle ired",
                "Request Failed",
                Res.msg.password
              );
            }
          })
          .catch((e) => {
            ProPassBtnRef.current.innerHTML = "Change Password";
            console.log(e);
            props.ShowToast(
              "fa-xmark-circle ired",
              "Server Error ",
              "Server sending no response."
            );
          });
      } else {
        ProPassBtnRef.current.innerHTML = "Change Password";
        props.ShowToast(
          "fa-xmark-circle ired",
          "Passwords Not Matched",
          "Password fields does not matched."
        );
      }
    } else {
      ProPassBtnRef.current.innerHTML = "Change Password";
      props.ShowToast(
        "fa-xmark-circle ired",
        "Invalid Password pattern",
        "Password fields are not Validate."
      );
    }
    ProPassFieldRef.current.value = "";
    ReProPassFieldRef.current.value = "";
    ProPassBtnRef.current.style.width = "auto";
  }

  function ProPasswordToggler() {
    setShowProPass(!ShowProPass);
  }
  function ReProPasswordToggler() {
    setShowReProPass(!ShowReProPass);
  }

  useEffect(() => {
    let user_data = localStorage.getItem("user_data");
    if (user_data) {
      user_data = user_data.split(",");
    }
    ProNameFieldRef.current.value = user_data[0];
    ProEmailFieldRef.current.value = user_data[1];
  }, []);

  // email and name change api send
  function HandleProNameFields(e) {
    let value = e.target.value;
    if (value.length > 100) {
      ProNameErrRef.current.innerText =
        "Length Should be less than 99 characters.";
    } else {
      ProNameErrRef.current.innerText = null;
    }
  }

  function HandleProEmailFields(e) {
    let value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let CheckEmail = emailRegex.test(value);

    if (!CheckEmail) {
      ProEmailErrRef.current.innerText = "Invalid Email Address";
    } else {
      ProEmailErrRef.current.innerText = null;
    }
  }

  async function HandleProFields(e) {
    e.preventDefault();
    const UserData = {
      name: ProNameFieldRef.current.value,
      email: ProEmailFieldRef.current.value,
    };
    ProEmailBtnRef.current.innerHTML =
      "<i class='fa-light fa-sync fa-spin'></i>";
    ProEmailsubmitBtn.current.style.width = "15%";
      await fetch(`http://localhost:8000/api/change-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(UserData),
      })
        .then((Response) => {
          return Response.json();
        })
        .then((Res) => {
          if (Res.success) {
            ProEmailBtnRef.current.innerHTML =
              "Updated <i class='fa-solid fa-check-circle'></i>";
            props.ShowToast(
              "fa-check-circle igreen",
              "Fullname/Email Successfully Changed",
              "Your Email or your full name successfully change, Now go to login with a unique email address"
            );
            localStorage.setItem(
              "user_data",
              `${UserData["name"] + "," + UserData["email"]}`
            );
          } else {
            ProEmailBtnRef.current.innerHTML = "Update Changes";
            props.ShowToast(
              "fa-info-circle iblue",
              "No Changes",
              Res.msg.name ?? Res.msg.email
            );
          }
        })
        .catch((e) => {
          ProEmailBtnRef.current.innerHTML = "Update Changes";
          console.log(e);
          props.ShowToast(
            "fa-xmark-circle ired",
            "Server Error ",
            "Server sending no response."
          );
        });


    ProEmailsubmitBtn.current.style.width = "auto";
  }

  return (
    <div className="personal_pro_wrap">
      <div className="personal_pro_head">Personal Information</div>
      <div className="personal_pro_container">
        <div className="personal_pro_fields">
          <form method="post" onSubmit={HandleProFields}>
            <div className="personal_pro_h2">Account Details</div>

            <div className="input-box">
              <label htmlFor="set-pro_name">Full Name</label>
              <input
                type="text"
                onChange={HandleProNameFields}
                ref={ProNameFieldRef}
                id="set-pro_name"
              />
              <p ref={ProNameErrRef}></p>
            </div>
            <div className="input-box">
              <label htmlFor="set-pro_email">Email Address</label>
              <input
                type="email"
                onChange={HandleProEmailFields}
                ref={ProEmailFieldRef}
                id="set-pro_email"
              />
              <p ref={ProEmailErrRef}></p>
            </div>

            <div ref={ProEmailsubmitBtn} className="input-button">
              <button type="submit" ref={ProEmailBtnRef}>
                Update Changes
              </button>
            </div>
          </form>

          <form onSubmit={HandleChangePass}>
            <div className="personal_pro_h2">Change Password</div>
            <p>
              if you want to change your password? then you can change it by
              filling these new password fields below.
            </p>

            <div className="input-box">
              <label htmlFor="set_pro_pass">Password</label>
              <input
                ref={ProPassFieldRef}
                onChange={HandleProPassField}
                type={ShowProPass ? "text" : "password"}
                id="set_pro_pass"
              />
              <p ref={NewProPassErrRef}></p>
              <span
                onClick={ProPasswordToggler}
                className={`${ShowProPass ? "" : "hidepass"} showpass`}
              >
                <i
                  className={`fa-solid fa-eye${ShowProPass ? "" : "-slash"} `}
                ></i>
              </span>
            </div>
            <div className="input-box">
              <label htmlFor="set_pro_pass">New Password</label>
              <input
                ref={ReProPassFieldRef}
                onChange={HandleReProPassField}
                type={ShowReProPass ? "text" : "password"}
                id="set_pro_pass"
              />
              <p ref={NewReProPassErrRef}></p>
              <span
                onClick={ReProPasswordToggler}
                className={`${ShowReProPass ? "" : "hidepass"} showpass`}
              >
                <i
                  className={`fa-solid fa-eye${ShowReProPass ? "" : "-slash"} `}
                ></i>
              </span>
            </div>

            <div ref={ProsubmitBtn} className="input-button">
              <button type="submit" ref={ProPassBtnRef}>
                Change Password{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
