// import React from "react";
// import $ from "jquery";

// export default function Slider() {
//   $("document").ready(function () {
//     // sider grid images
//     var btn = 0;

//     // default slide
//     $(".dots .dot").eq(btn).addClass("active");
//     $(".slide").eq(btn).addClass("active");

//     const slides = document.querySelectorAll(".slides > .slide");
//     const dots = document.querySelectorAll(".dots > button");
//     const arrows = document.querySelectorAll(".arrows > button");
//     arrows.forEach((arrow) => {
//       arrow.addEventListener("click", function () {
//         let activeSlide = $(".dot.active").index();
//         let index = $(this).data("index");
//         if (index == 1) {
//           btn = activeSlide - 1;
//         } else if (index == 0) {
//           if (activeSlide < slides.length - 1) {
//             btn = activeSlide + 1;
//           } else {
//             btn = 0;
//           }
//         }
//         $(".dots .dot").removeClass("active");
//         $(".dots .dot").eq(btn).addClass("active");
//         $(".slide").removeClass("active");
//         $(".slide").eq(btn).addClass("active");
//       });
//     });

//     dots.forEach((dot, index) => {
//       dot.addEventListener("click", () => {
//         slides.forEach((item, i) => {
//           $(".dots .dot").removeClass("active");
//           $(".dots .dot").eq(index).addClass("active");
//           $(".slide").removeClass("active");
//           $(".slide").eq(index).addClass("active");
//         });
//       });
//     });
//     setInterval(() => {
//         var activeSlide = $(".dot.active").index()
//         btn = activeSlide - 1;

//                 $(".dots .dot").removeClass("active")
//             $(".dots .dot").eq(btn).addClass("active")
//             $(".slide").removeClass("active")
//             $(".slide").eq(btn).addClass("active")
//     }, 4000);
//   });
//   return (
//       <div className="slider-frame">
//         <div className="slides">
//           <div className="slide">
//             <div className="inner-content">
//               <h1>Carousel Slider.</h1>
//               <p>
//                 Using Html Css & JQuery{" "}
//                 <i className="fa-solid fa-arrow-right mx-1"></i> A fast, small, and
//                 feature-rich JavaScript library.{" "}
//               </p>
//               <button>
//                 Download It Now It's Free{" "}
//                 <i className="fa-regular fa-arrow-down"></i>
//               </button>
//             </div>
//             <div className="source-images">
//               <img
//                 loading="lazy"
//                 src="https://source.unsplash.com/random/?rich"
//                 alt=""
//               />
//             </div>
//           </div>
//           <div className="slide">
//             <div className="inner-content">
//               <h1>An Interactive & Minimal.</h1>
//               <p>
//                 Instead of embracing materialism, experientalism is about
//                 collecting experiences.
//               </p>
//               <button>
//                 Download It Now It's Free{" "}
//                 <i className="fa-regular fa-arrow-down"></i>
//               </button>
//             </div>
//             <div className="source-images">
//               <img
//                 loading="lazy"
//                 src="https://source.unsplash.com/random/?website"
//                 alt=""
//               />
//             </div>
//           </div>
//           <div className="slide">
//             <div className="inner-content">
//               <h1>Responsive Hero Section.</h1>
//               <p>
//                 A fully responsive website will rescale itself to preserve the
//                 user experience and look and feel across all devices.
//               </p>
//               <button>
//                 Download It Now It's Free{" "}
//                 <i className="fa-regular fa-arrow-down"></i>
//               </button>
//             </div>
//             <div className="source-images">
//               <img
//                 loading="lazy"
//                 src="https://source.unsplash.com/random/?technology"
//                 alt=""
//               />
//             </div>
//           </div>
//           <div className="slide">
//             <div className="inner-content">
//               <h1>Navigating locations.</h1>
//               <p>
//                 navigation points are described below which is like as dots.
//               </p>
//               <button>
//                 Download It Now It's Free{" "}
//                 <i className="fa-regular fa-arrow-down"></i>
//               </button>
//             </div>
//             <div className="source-images">
//               <img
//                 loading="lazy"
//                 src="https://source.unsplash.com/random/?rich"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>
//         <div className="navigator">
//           <div className="dots">
//             <button className="dot"></button>
//             <button className="dot"></button>
//             <button className="dot"></button>
//             <button className="dot"></button>
//           </div>
//           <div className="arrows">
//             <button data-index="0" className="prev">
//               <i className="fas fa-arrow-left"></i>
//             </button>
//             <button data-index="1" className="next">
//               <i className="fas fa-arrow-right"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//   );
// }
import React, { useState, useEffect } from "react";
import SliderImg from "../../images/DarkThemeIcon.png";

export default function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: "Carousel Slider.",
      content:
        "Using Html Css & JQuery A fast, small, and feature-rich JavaScript library.",
      imageUrl: SliderImg,
    },
    {
      title: "An Interactive & Minimal.",
      content:
        "Instead of embracing materialism, experientalism is about collecting experiences.",
      imageUrl: SliderImg,
    },
    {
      title: "Responsive Hero Section.",
      content:
        "A fully responsive website will rescale itself to preserve the user experience and look and feel across all devices.",
      imageUrl: SliderImg,
    },
    {
      title: "Navigating locations.",
      content: "navigation points are described below which is like as dots.",
      imageUrl: SliderImg,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevActiveSlide) =>
        prevActiveSlide === slides.length - 1 ? 0 : prevActiveSlide + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleNextSlide = () => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide === slides.length - 1 ? 0 : prevActiveSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide === 0 ? slides.length - 1 : prevActiveSlide - 1
    );
  };

  return (
    <div className="slider-frame">
      <div className="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${activeSlide === index ? "active" : ""}`}
          >
            <div className="inner-content">
              <h1>{slide.title}</h1>
              <p>{slide.content}</p>
              <button>
                Download It Now It's Free <i className="fa-regular fa-arrow-down"></i>
              </button>
            </div>
            <div className="source-images">
              <img loading="lazy" src={slide.imageUrl} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="navigator">
        <div className="dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeSlide === index ? "active" : ""}`}
              onClick={() => handleSlideChange(index)}
            ></button>
          ))}
        </div>
        <div className="arrows">
          <button className="prev" onClick={handlePrevSlide}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button className="next" onClick={handleNextSlide}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
