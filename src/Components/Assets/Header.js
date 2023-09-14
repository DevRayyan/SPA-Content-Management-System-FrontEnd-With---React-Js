import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header(props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    HideHeaderOnLinkClick();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      if (isMobile) {
        props.CollapseFunc(false);
      }
    };

    window.addEventListener("resize", handleResize);
  }, [props.IsCollapse]);

  function HideHeaderOnLinkClick() {
    const HeaderMenuLink = document.querySelectorAll(".header ul li");
    const HeaderBtn = document.querySelectorAll(".nav-end-btn a");
    HeaderMenuLink.forEach((link) => {
      link.addEventListener("click", () => {
        props.CollapseFunc(false);
      });
    });
    HeaderBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        props.CollapseFunc(false);
      });
    });
  }

  const token = localStorage.getItem("token");


  return (
    <>
      {isMobile == true ? (
        props.IsCollapse && (
          <header
            className={`header ${props.IsCollapse ? "header-collapse" : ""}`}
          >
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/browse">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/team">Team</NavLink>
              </li>
              <li>
                <NavLink to="/plans">Plans & Pricing</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
            </ul>
            <div className="nav-end-btn">
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
              <Link to="/logout">Logout</Link>
          </div>
          </header>
        )
      ) : (
        <header
          className={`header ${props.IsCollapse ? "header-collapse" : ""}`}
        >
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/team">Team</NavLink>
            </li>
            <li>
              <NavLink to="/plans">Plans & Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
          <div className="nav-end-btn">
            {
              !token ? <>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
              </>:
              <Link to="/logout">Logout</Link>
            }
          </div>
        </header>
      )}
    </>
  );
}
