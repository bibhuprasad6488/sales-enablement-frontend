import { useEffect, useRef, useState } from "react";
import LogIn from "./Login";
import { useLocation } from "react-router-dom";
import SignUp from "./SignUp";
import MyLearningJourney from "../components/MyLearningJourney";
import PersonalInformation from "../components/PersonalInfo";
import ChangePassword from "./ChangePwd";
import { useTab } from "../context/TabContext";

const PUBLIC_TABS = ["login", "signup"];
const PRIVATE_TABS = ["journey", "personal", "password"];

const AuthTab = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const location = useLocation();

  const { activeTab, setActiveTab } = useTab();
  // useEffect(() => {
  //   if (location.state?.activeTab) {
  //     setActiveTab(location.state.activeTab);
  //   }
  // }, [location.state, setActiveTab]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  }, []);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, [isVisible]);

  useEffect(() => {
    if (!isLoggedIn && PRIVATE_TABS.includes(activeTab)) {
      setActiveTab("login");
    }
  }, [activeTab, isLoggedIn, setActiveTab]);

  const tabButtonClass = (key) =>
    `relative group flex justify-center items-center transition-all duration-500 ease-out uppercase text-sm font-bold px-2 py-2 sm:px-4 sm:py-4 md:px-10 md:py-3 ${
      activeTab === key
        ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-md"
        : "bg-[#383f71] text-white"
    }`;

  const handleLoginSuccess = () => {
    localStorage.setItem("token", "your-token-here");
    setIsLoggedIn(true);
    setActiveTab("journey");
  };

  return (
    <div className="py-12 flex flex-col content-center">
      <div
        ref={headerRef}
        className={`w-full bg-white ${
          isVisible
            ? "fixed left-0 right-0 top-0 sm:top-0 md:top-0 lg:top-0 z-30 container-fluid px-4"
            : "relative"
        }`}
      >
        <div className="flex justify-center z-10 py-3 overflow-hidden transition-all duration-500">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setActiveTab("login")}
                className={tabButtonClass("login")}
              >
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 group-hover:text-[#DB0032]">
                  Login
                </span>
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={tabButtonClass("signup")}
              >
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 group-hover:text-[#DB0032]">
                  Sign Up
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("journey")}
                className={tabButtonClass("journey")}
              >
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative text-xs sm:text-sm z-10 group-hover:text-[#DB0032]">
                  My Learning Journey
                </span>
              </button>
              <button
                onClick={() => setActiveTab("personal")}
                className={tabButtonClass("personal")}
              >
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 text-xs sm:text-sm group-hover:text-[#DB0032]">
                  Personal Details
                </span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={tabButtonClass("password")}
              >
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 text-xs sm:text-sm group-hover:text-[#DB0032]">
                  Change Password
                </span>
              </button>
            </>
          )}
        </div>

        <div className="relative flex items-center my-2 w-full">
          <div className="flex-grow border-t-2 border-[#DB0032]"></div>
          <div className="flex-grow border-t-2 border-[#FA6602]"></div>
        </div>
      </div>

      {isVisible && <div style={{ height: headerHeight }} />}

      <div className="w-full mt-4 p-0 sm:p-6 bg-white">
        {!isLoggedIn ? (
          activeTab === "login" ? (
            <LogIn onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignUp />
          )
        ) : activeTab === "journey" ? (
          <MyLearningJourney />
        ) : activeTab === "personal" ? (
          <PersonalInformation />
        ) : activeTab === "password" ? (
          <ChangePassword />
        ) : (
          <MyLearningJourney />
        )}
      </div>
    </div>
  );
};

export default AuthTab;
