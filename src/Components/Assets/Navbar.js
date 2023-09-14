import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import $ from "jquery";
import PostCover from "../../images/browseBanner.jpg";
import { NavLink, Link } from "react-router-dom";
import Header from "./Header";

export default function Navbar(props) {
  const { body } = document;
  const [Dropdown, setDropdown] = useState(false);
  const [ProfileDropdown, setProfileDropdown] = useState(false);
  const [Bookmark, setBookmark] = useState(false);
  const [IsHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const CurrPlan =  localStorage.getItem("status");
  $("document").ready(function () {
    // navbar on collapsed
    $(".nav-trigger").click(function () {
      $(".nav-colapsed").toggleClass("open");
      $(this).children("i").toggleClass("fa-xmark");
    });

    $(document).click(function (e) {
      if (
        !$(e.target).closest(".nav-colapsed").length &&
        !$(e.target).closest(".nav-trigger").length
      ) {
        $(".nav-colapsed").removeClass("open");
        $(".nav-trigger").children("i").removeClass("fa-xmark");
      }
    });
  });

  var getTheme = localStorage.getItem("theme_mode");
    let token = localStorage.getItem("token");
    let user_data = localStorage.getItem("user_data");
    if(user_data){
      user_data = user_data.split(",");
    }
  useLayoutEffect(() => {
    document.addEventListener("click", handleClickOutside);
    body.classList.add(getTheme);
    SwitchTheme();
  }, []);

  const HandleDropdown = () => {
    setDropdown(!Dropdown);
  };
  const HandleBookmark = () => {
    setBookmark(!Bookmark);
  };

  const HandleProfileDropdown = () => {
    setProfileDropdown(!ProfileDropdown);
  };

  const SwitchTheme = () => {
    const themes = document.querySelectorAll(".themeModes li button");
    themes.forEach((theme) => {
      theme.addEventListener("click", () => {
        const mode = theme.dataset.mode;
        body.classList.remove(mode === "dark" ? "light" : "dark");
        localStorage.setItem("theme_mode", mode);
        body.classList.add(mode);
        if (mode === "dark") {
          props.ShowToast(
            "fa-moon-cloud igray",
            "Dark Mode Enabled",
            "The dark mode has been successfully turned on."
          );
        } else if (mode === "light") {
          props.ShowToast(
            "fa-sun iorange",
            "Light Mode Enabled",
            "The light mode has been successfully turned on."
          );
        }
      });
    });
  };

  function handleClickOutside(e) {
    const DropdownToggler = document.querySelector(".dropdown-toggler");
    const ProfileDropdownToggler = document.querySelector(
      ".nav_profile_toggler"
    );
    const Bookmark = document.querySelector(".bookmark-toggler");
    if (DropdownToggler && !DropdownToggler.contains(e.target)) {
      setDropdown(false);
    }
    if (ProfileDropdownToggler && !ProfileDropdownToggler.contains(e.target)) {
      setProfileDropdown(false);
    }
    if (Bookmark && !Bookmark.contains(e.target)) {
      setBookmark(false);
    }
  }

  function HandleHeader() {
    setIsHeaderCollapse(!IsHeaderCollapse);
  }
  return (
    <>
      <div className="free-space"></div>
      <nav>
        <div className="navlogo ">Entense</div>
        <div className="navigate-by-search">
          <div className="nav-center-search-box">
            <input type="text" placeholder="Find any blog that you like" />
            <div>
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className="nav-btns">
          <div className="nav-btn">
            <NavLink to="/notification" className="nav-link ">
              <i className="fa-regular fa-bell"></i>
              <div className="indicator red"></div>
            </NavLink>
          </div>
          <div className="nav-btn">
            <a className="nav-link bookmark-toggler" onClick={HandleBookmark}>
              <i className="fa-regular fa-bookmark"></i>
            </a>
            <div className={`bookmark_container ${Bookmark ? "active" : ""}`}>
              <div className="bookmark_heading">Bookmark</div>
              <ul>
                <li>
                  <div className="post_cover">
                    <img src={PostCover} alt="" />
                  </div>
                  <a href="#">
                    The transition property is used to add a smooth transition
                    effect to the opacity change.
                  </a>
                  <button>
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </li>
                <li>
                  <div className="post_cover">
                    <img src={PostCover} alt="" />
                  </div>
                  <a href="#">
                    The transition property is used to add a smooth transition
                    effect to the opacity change.
                  </a>
                  <button>
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </li>
                <li>
                  <div className="post_cover">
                    <img src={PostCover} alt="" />
                  </div>
                  <a href="#">
                    The transition property is used to add a smooth transition
                    effect to the opacity change.
                  </a>
                  <button>
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </li>
                <li>
                  <div className="post_cover">
                    <img src={PostCover} alt="" />
                  </div>
                  <a href="#">
                    The transition property is used to add a smooth transition
                    effect to the opacity change.
                  </a>
                  <button>
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </li>
                <li>
                  <div className="post_cover">
                    <img src={PostCover} alt="" />
                  </div>
                  <a href="#">
                    The transition property is used to add a smooth transition
                    effect to the opacity change.
                  </a>
                  <button>
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </li>
              </ul>
              <div className="bookmark_footer">
                <Link to="/bookmark">View All Bookmark</Link>
              </div>
            </div>
          </div>
          <div className="drop-down nav-btn">
            <a
              onClick={HandleDropdown}
              className={` dropdown-toggler nav-link ${
                Dropdown ? "active" : ""
              }`}
            >
              <i className="fa-regular fa-palette"></i>
            </a>
            <div
              className={`user-account-dropdown ${Dropdown ? "active" : ""}`}
            >
              <ul className="navbar_dropdown themeModes">
                <li>
                  <button data-mode="light" className="navbar_drop_links">
                    Sunrise
                  </button>
                </li>
                <li>
                  <button data-mode="dark" className="navbar_drop_links">
                    Nightfall
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- mini profile  functionality --> */}
          {localStorage.getItem("token") && (
            <div className="nav-btn mini-profile">
              <a
                onClick={HandleProfileDropdown}
                className={`nav_profile_toggler nav-link ${
                  ProfileDropdown ? "active" : ""
                }`}
              >
                <i className="fa-regular fa-user"></i>
              </a>
              <div className={`nav-profile ${ProfileDropdown ? "active" : ""}`}>
                <div className="nav-profile-top">
                  <div className="profile-cover">
                    <label for="profile_cover">
                      <i className="fa-regular fa-camera"></i>
                    </label>
                    <input
                      type="file"
                      id="profile_cover"
                      style={{ visibility: "hidden" }}
                    />
                  </div>
                  <div>
                    <h4>{user_data[0]}</h4>
                    <p>{user_data[1]}</p>
                  </div>
                </div>
                <div className="view-profile-btn-case">
          { (CurrPlan && CurrPlan == 'pro'? 

<Link to="/plans" style={{boxShadow:"none"}} className="curr-plan view-profile-btn">
                    Pro Plan Activated <i className="fa-regular fa-check"></i>
                  </Link>:
                  <Link to="/plans" className="view-profile-btn">
                  Upgrade to Premium
                </Link>
                    )}
                </div>
                <div>
                  <ul className="navbar_dropdown">
                    <li>
                      <Link
                        to="/settings/profile"
                        className="navbar_drop_links"
                      >
                        <i className="fa-regular fa-user"></i>Manage Your
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link to="/notification" className="navbar_drop_links">
                        <i className="fa-regular fa-bell"></i>Notifications
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookmark" className="navbar_drop_links">
                        <i className="fa-regular fa-bookmark"></i>Bookmark
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings/profile"
                        className="navbar_drop_links"
                      >
                        <i className="fa-regular fa-gear"></i>Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/logout" className="navbar_drop_links">
                        <i className="fa-regular fa-arrow-right-from-bracket"></i>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <div className={`nav-btn header-collapser `}>
            <NavLink onClick={HandleHeader} className="nav-link ">
              <i
                className={`fa-regular ${
                  IsHeaderCollapse ? "fa-xmark" : "fa-bars"
                }`}
              ></i>
            </NavLink>
          </div>
        </div>
      </nav>
      {
        <Header
          IsCollapse={IsHeaderCollapse}
          CollapseFunc={setIsHeaderCollapse}
          
        />
      }
    </>
  );
}
