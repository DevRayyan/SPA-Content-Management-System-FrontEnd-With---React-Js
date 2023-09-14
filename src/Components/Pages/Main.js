import React from "react";
import $ from "jquery";
import Header from "../Assets/Header";
import Slider from "../Assets/Slider";
import CategoryContainer from "../Category/CategoryContainer";
import BlogContainer from "../Blogs/BlogContainer";
import AdminBanner from "../Assets/AdminBanner";
import Testimonials from "../Assets/Testimonials";
import MainContact from "../Assets/MainContact";
import FooterTop from "../Assets/FooterTop";

export default function Main(props) {

  return (
    <>

      {/* <Header /> */}
      <Slider />
      <CategoryContainer />
      <BlogContainer />
      <Testimonials />
      <AdminBanner/>
      <MainContact ShowToast={props.ShowToast} />
      <FooterTop/>
    </>
  );
}
