import { useState, useEffect } from "react";
import LogIn from "./Login";
import SignUp from "./SignUp";
import MyLearningJourney from "../components/MyLearningJourney";
import PersonalInformation from "../components/PersonalInfo";
import ChangePassword from "./ChangePwd";
import { useTab } from "../context/TabContext";

const AuthTab = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { activeTab } = useTab();
  const { setActiveTab } = useTab();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleScroll = () => {
    setIsVisible(window.scrollY > 400);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabButtonClass = (tabName) => {
    return `relative group flex justify-center items-center transition-all duration-500 ease-out uppercase text-sm font-bold px-2 py-2 sm:px-4 sm:py-4 md:px-10 md:py-3 
      ${activeTab === tabName ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-md" : "bg-[#383f71] text-white"}`;
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("token", "your-token-here");
    setIsLoggedIn(true);
  };

  return (
    <div className="py-12 flex flex-col items-center">
      <div className={`w-full bg-white ${isVisible ? "fixed top-44 sm:top-24 md:top-28 lg:top-20 z-30 container px-4" : "relative"}`}>
        <div className="flex justify-center z-10 py-3 bg- overflow-hidden transition-all duration-500">
          {!isLoggedIn && (
            <>
              <button onClick={() => setActiveTab("Login")} className={tabButtonClass("Login")}>
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 group-hover:text-[#DB0032]">Login</span>
              </button>
              <button onClick={() => setActiveTab("Sign Up")} className={tabButtonClass("Sign Up")}>
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 group-hover:text-[#DB0032]">Sign Up</span>
              </button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button onClick={() => setActiveTab("My Learning Journey")} className={tabButtonClass("My Learning Journey")}>
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative text-xs sm:text-sm z-10 group-hover:text-[#DB0032]">My Learning Journey</span>
              </button>
              <button onClick={() => setActiveTab("Personal Details")} className={tabButtonClass("Personal Details")}>
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 text-xs sm:text-sm group-hover:text-[#DB0032]">Personal Details</span>
              </button>
              <button onClick={() => setActiveTab("Change Password")} className={tabButtonClass("Change Password")}>
                <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 text-xs sm:text-sm group-hover:text-[#DB0032]">Change Password</span>
              </button>
            </>
          )}
        </div>
        <div className="relative flex items-center my-2 w-full">
          <div className="flex-grow border-t-2 border-[#DB0032]"></div>
          <div className="flex-grow border-t-2 border-[#FA6602]"></div>
        </div>
      </div>
      <div className="w-full mt-4 p-0 sm:p-6 bg-white">
        {activeTab === "Login" ? (
          <LogIn onLoginSuccess={handleLoginSuccess} />
        ) : activeTab === "Sign Up" ? (
          <SignUp />
        ) : activeTab === "Change Password" ? (
          <ChangePassword />
        ) : activeTab === "Personal Details" ? (
          <PersonalInformation />
        ) : activeTab === "My Learning Journey" ? (
          <MyLearningJourney />
        ) : null}
      </div>
    </div>
  );
};

export default AuthTab;
