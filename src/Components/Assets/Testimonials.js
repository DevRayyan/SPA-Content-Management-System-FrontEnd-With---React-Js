import React, { useLayoutEffect, useState } from "react";
import PortionEnd from "./PortionEnd";
import TestimonialCard from "./TestimonialCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export default function Testimonials() {
  const [Review, setReview] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const SkBgColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-base-clr"
  );
  const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-highlight-clr"
  );

  useLayoutEffect(() => {
    FetchReview();
  }, []);
  async function FetchReview() {
    setIsLoading(true);
    await fetch("http://localhost:8000/api/fetch-review", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((Response) => {
        return Response.json();
      })
      .then((Data) => {
        setIsLoading(false);
        setReview(Data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="testimonial">
        <div className="testimonial-heading">
          <h1 className="overlay-blue-underline">Testmonials</h1>
          <p>
            "Cover what others are saying about us, Read our blowing
            testimonials"
          </p>
        </div>
        <div className="testimonial-container">
          {IsLoading
            ? [...Array(3)].map((_, i) => (
                <SkeletonTheme key={i}
                  baseColor={SkBgColor}
                  highlightColor={SkhighlightColor}
                >
                  <div className="testimonial-card">
                    <div className="intro">
                      <Skeleton width={40} borderRadius={10} height={40} />
                      <div style={{ marginLeft: 10 }}>
                        <h3>{<Skeleton width={150} />}</h3>
                        <small>{<Skeleton width={100} />}</small>
                      </div>
                    </div>
                    <p>{<Skeleton count={3} />}</p>
                    <div className="date">
                      <span>{<Skeleton width={"25%"} />}</span>
                    </div>
                  </div>
                </SkeletonTheme>
              ))
            : Review &&
              Review.map((Rev, i) => {
                return <TestimonialCard data={Rev} key={i}/>;
              })}
        </div>
      </div>
      <PortionEnd title="Load more Reviews" />
    </>
  );
}
