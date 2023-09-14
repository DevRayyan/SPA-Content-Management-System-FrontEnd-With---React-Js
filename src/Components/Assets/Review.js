import React, { useRef, useState } from "react";
export default function Review(props) {
  const [image, setImage] = useState(null);

  const RevNameRef = useRef(null);
  const RevOccRef = useRef(null);
  const RevEmailRef = useRef(null);
  const RevMsgRef = useRef(null);
  const RevSubmitBtnBoxRef = useRef(null);
  const ImgPreview = useRef(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  if (image) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      ImgPreview.current.src = reader.result;
    });

    reader.readAsDataURL(image);
  }

  async function HandleReview(e) {
    e.preventDefault();
    if (localStorage.getItem("token") == undefined) {
      props.ShowToast(
        "fa-xmark-circle ired",
        "Login Required",
        "Login to your account to write reviews or testimonials."
      );
      return;
    }
    RevSubmitBtnBoxRef.current.innerHTML =
      "<i class='fa-regular fa-sync fa-spin'></i>";

    if (
      RevNameRef.current.value === "" ||
      RevEmailRef.current.value === "" ||
      RevMsgRef.current.value === ""
    ) {
      props.ShowToast(
        "fa-xmark-circle ired",
        "Empty Fields",
        "Please fill in all the required fields."
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(RevEmailRef.current.value);

    if (RevNameRef.current.value.length > 100) {
      props.ShowToast("fa-xmark-circle ired", "Maximum 100 Words Required");
      return;
    }

    if (!isValidEmail) {
      props.ShowToast("fa-xmark-circle ired", "Invalid Email Address");
      return;
    }

    if (RevMsgRef.current.value.length > 250) {
      props.ShowToast("fa-xmark-circle ired", "Maximum 250 Words Required");
      return;
    }

    const ReviewData = new FormData();
    ReviewData.append("name", RevNameRef.current.value);
    ReviewData.append("email", RevEmailRef.current.value);
    ReviewData.append("msg", RevMsgRef.current.value);

    if (RevOccRef.current.value) {
      ReviewData.append("occupation", RevOccRef.current.value);
    }
    
    if (image) {
      ReviewData.append("image", image);
    }
    try {

  await fetch("http://localhost:8000/api/review", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:ReviewData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (!data.success) {
            if(data.msg == "limitend"){
              props.ShowToast("fa-xmark-circle ired","Limit End","Only two time you can send review.");
            }
            if(data.msg.image){
              props.ShowToast("fa-xmark-circle ired","Image Error",data.msg.image);
            }
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
            props.ShowToast("fa-check-circle igreen","Review Sended","Your review sucessfully sended to the admin first they check it then your review will publish.");
          }
        });
    } catch (error) {
              props.ShowToast("fa-xmark-circle ired","Server Error","check console in your browser");
              console.log("Error creating review:", error);
    }
    RevSubmitBtnBoxRef.current.innerHTML = "Send Review";
  }

  return (
    <div
      style={{ display: props.IsActive ? "flex" : "none" }}
      className="contact-box review-box"
    >
      <div className="review-contact-head">
        <h1>Write a Review</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
          iusto?
        </p>
      </div>
      <form encType="multipart/from-data" onSubmit={HandleReview}>
        <div className="input-grid">
          <div className="input-box">
            <label htmlFor="rev_name">Full Name</label>
            <input type="text" ref={RevNameRef} id="rev_name" required />
          </div>
          <div className="input-box">
            <label htmlFor="rev_occupation">
              Occupation <small>(Optional)</small>
            </label>
            <input type="text" ref={RevOccRef} id="rev_occupation" />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="rev_email">Email Address</label>
          <input type="email" ref={RevEmailRef} id="rev_email" required />
        </div>
        <div className="input-box">
          <label htmlFor="rev_review">Write a Review</label>
          <textarea
            id="rev_review"
            ref={RevMsgRef}
            cols="30"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="input-button">
          <input
            onChange={handleImageChange}
            type="file"
            id="rev_image"
            name="image"
            style={{ display: "none" }}
          />
          <label htmlFor="rev_image" className="reviewer-image">
        {image ?<img width={"100%"} height={"100%"} style={{objectFit:"cover",borderRadius:"50%"}} ref={ImgPreview} alt="Image Preview"/>:
        
            <i className="fa-regular fa-camera"></i>
        }

          </label>
          <button ref={RevSubmitBtnBoxRef}>Send Review</button>
        </div>
      </form>
    </div>
  );
}
