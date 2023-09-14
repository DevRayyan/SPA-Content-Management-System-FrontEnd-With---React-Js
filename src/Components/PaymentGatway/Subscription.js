import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Plan from "./Plan";
import Loading from "../Assets/Loader";
const stripePromise = loadStripe(
  "pk_test_51NArHPDqLoKHNkLbeZepmk7Vx6XiF0tforDXSdzXJn8PKmNvOp5vUMDecIwSNVEpFKd4SSyrOfxlqkccsgRqgp5600SrJ9NF0g"
);
export default function Subscription(props) {
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      props.ShowToast(
        "fa-xmark-circle ired",
        "Login Required",
        "Login to your account to purchase a plan."
      );
      navigate("/login", { replace: true });
      return;
    }
    const items = { price: 100 };

    fetch("http://localhost:8000/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data && setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: props.themeMode == "dark" ? "night" : "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {!clientSecret ? (
        <Loading />
      ) : (
        <div className="subscibe-page pricing-container">
          <div className="subscibe-s">
            <div
              className="pricing-plan-heading"
              style={{ marginBottom: "clamp(15px,1vw,1vw)" }}
            >
              Selected Subscription Is.
            </div>
            <div className="subscibe-plan">
              <Plan Btn={false} />
            </div>
          </div>
          <div className="subscibe-e">
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm ShowToast={props.ShowToast} />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
}
