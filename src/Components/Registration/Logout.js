import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import Loader from "../Assets/Loader";

const Logout = (props) => {
  var token = localStorage.getItem("token");
  const Navigate = useNavigate();
  if (!token) {
    Navigate("/login",{replace:true});
  }
  props.ShowToast("fa-check-circle ired", "You are Logging Out Successfully");
  console.log(token);
  async function logging() {
    const fetchResult = fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((Response)=>{
return Response.json();
    }).then((Res)=>{
      console.log(Res)
    }).catch((e)=>{
      console.log(e)

    })
  }
  logging();
  token && localStorage.removeItem("token");
  Navigate("/login",{replace:true});
  return <Loader />;
};
export default Logout;
