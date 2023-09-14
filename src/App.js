import {useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./Components/Assets/Loader";
import "./Css/style.css";

import Navbar from "./Components/Assets/Navbar";
import Footer from "./Components/Assets/Footer";
import Toast from "./Components/Assets/Toast";

const Main = lazy(() => import("./Components/Pages/Main"));
const Subscription = lazy(() => import("./Components/PaymentGatway/Subscription"));
const Category = lazy(() => import("./Components/Category/Category"));
const About = lazy(() => import("./Components/Pages/About"));
const Pricing = lazy(() => import("./Components/Pages/Pricing"));
const Contact = lazy(() => import("./Components/Pages/Contact"));
const Team = lazy(() => import("./Components/Team/Team"));
const BrowseBlogs = lazy(() => import("./Components/Pages/BrowseBlogs"));
const Registration = lazy(() =>
  import("./Components/Registration/Registration")
);
const Login = lazy(() => import("./Components/Registration/Login"));
const Logout = lazy(() => import("./Components/Registration/Logout"));
const ResetPassword = lazy(() => import("./Components/Registration/ResetPassword"));
const VerifyResetPassword = lazy(() => import("./Components/Registration/VerifyResetPassword"));
const BlogDetails = lazy(() => import("./Components/Pages/BlogDetails"));
const Notification = lazy(() =>
  import("./Components/Notification/Notification")
);
const Bookmark = lazy(() => import("./Components/Pages/Bookmark"));
const Settings = lazy(() => import("./Components/Settings/Settings"));




function App() {
  const [activeToast, setActiveToast] = useState(null);

  const ShowToast = (icon, title, msg) => {
    setActiveToast({ icon, title, msg });
    setTimeout(() => {
      setActiveToast(null);
    }, 5000);
  };
  const getFont = localStorage.getItem("font_mode");
  const getTheme = localStorage.getItem("theme_mode");
  useEffect(() => {
    document.body.classList.add(getFont);
    document.body.classList.add(getTheme);
  }, [getFont,getTheme]);



  return (
    <>
      <BrowserRouter>
        <Navbar ShowToast={ShowToast} />

     
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* main pages */}
            <Route path="/" element={<Main ShowToast={ShowToast} />} />
            <Route path="/logout" element={<Logout ShowToast={ShowToast}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<Category />} />
            <Route path="/contact" element={<Contact ShowToast={ShowToast} />} />
            <Route path="/plans" element={<Pricing />} />
            <Route path="/team" element={<Team />} />
            <Route path="/browse" element={<BrowseBlogs />} />
            <Route path="/browse/details/:query" element={<BlogDetails ShowToast={ShowToast} />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/bookmark" element={<Bookmark />} />

            {/* registration */}
            <Route path="/login" element={<Login ShowToast={ShowToast} />} />
            <Route
              path="/signup"
              element={<Registration ShowToast={ShowToast} />}
            />
            <Route path="/login/verify_reset/" element={<VerifyResetPassword ShowToast={ShowToast} />} />
            <Route path="/password_reset/:token" element={<ResetPassword ShowToast={ShowToast} />} />
       
       {/* settings */}
            <Route
              path="/settings"
              element={<Settings ShowToast={ShowToast} />}
            />
            <Route
              path="/settings/profile"
              element={<Settings ShowToast={ShowToast} Active="profile" />}
            />
            <Route
              path="/settings/billing"
              element={<Settings ShowToast={ShowToast} Active="billing" />}
            />
            <Route
              path="/settings/customize"
              element={<Settings ShowToast={ShowToast} Active="customize" />}
            />
            <Route
              path="/settings/notification"
              element={<Settings ShowToast={ShowToast} Active="notification" />}
            />

            {/* subscription */}
            <Route
              path="/subscribe"
              element={<Subscription ShowToast={ShowToast} themeMode={getTheme}/>}
            />
          
          </Routes>
        </Suspense>

        <Toast toastData={activeToast} removeToast={setActiveToast} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
