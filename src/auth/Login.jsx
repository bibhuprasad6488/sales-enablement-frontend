import React, { useContext, useEffect, useState } from "react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import RightArrow1 from "../assets/arrow-right1.png";
import axios from "../api/axios"
import { toast, ToastContainer } from 'react-toastify'; 
import { AuthContext } from "../context/AuthContext"
import { useTab } from "../context/TabContext";
function LogIn() {
    const { setActiveTab } = useTab();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loginData, setLoginData] = useState({ email_id: "", password: "" });
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(false);
  const { login } = useContext(AuthContext)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${forgotEmail}`);
    setShowForgotPassword(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }
  useEffect(() => {
    const savedEmail = localStorage.getItem("email_id");
    const savedPassword = localStorage.getItem("password");
    const rememberMe = JSON.parse(localStorage.getItem("rememberMe") || "false"); 
    if (rememberMe) {
      setLoginData({ email_id: savedEmail || "", password: savedPassword || "" });
      setRemember(true);
    }
  }, []);
  const handleRememberMe = () => {
    setRemember((prev) => !prev);
  };
  const validateFields = () => {
    let tempErrors = {};
    if (!loginData.email_id) tempErrors.email_id = "Email is required.";
    if (!loginData.password) tempErrors.password = "Password  is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    try {
      if (remember) {
        localStorage.setItem("email_id", loginData.email_id);
        localStorage.setItem("password", loginData.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email_id");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }
      const url = "/login";
      const { data: res } = await axios.post(url, loginData);
      if (res.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        const userData = { first_name: res.data.first_name };
        login(userData);
        toast.success(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }                               
    } catch (error) {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  return (
    <>
      <section className="flex items-center justify-center ">
        <div className="max-w-xl w-full bg-white p-6 md:p-8 lg:p-10  py-6  shadow-xl mx-4 md:mx-6 lg:mx-8">
          {!showForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mb-4 text-sm text-center">
                Take the next step in your sales journey.
              </p>
              <ToastContainer />

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <label
                    htmlFor="email_id"
                    className="block font-normal mb-1 text-sm"
                  >
                    Email Address
                  </label>
                  <FaEnvelope className="absolute left-3 top-10 text-gray-400" />
                  <input
                    id="email_id"
                    type="email"
                    name="email_id"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={loginData.email_id}
                    className="w-full border border-gray-300 pl-10 mt-1 p-2"
                  />
                  {errors && <span className="text-red-500 text-xs mt-2">{errors.email_id}</span>}

                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block font-normal text-black mb-1 text-sm"
                  >
                    Password
                  </label>
                  <FaLock className="absolute left-3 top-10 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginData.password}
                    className="w-full border border-gray-300 pl-10 pr-10 mt-1 p-2"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-10 text-gray-400 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors && <span className="text-red-500 text-xs mt-2">{errors.password}</span>}

                </div>
                <div className="flex justify-between items-center">
                  <label htmlFor="remember" className="flex gap-2  cursor-pointer items-center">
                    <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={handleRememberMe}
                      className="checkbox-custom w-5 hover:border-[#FA6602] h-5 border-2 border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                    />
                    <span className="text-sm">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[#DB0032] hover:text-[#FA6602] cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="text-white w-full group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5 flex items-center justify-center"
                  >
                    <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                    <span className="relative text-white group-hover:text-white flex items-center">
                      Login
                      <img
                        src={RightArrow1}
                        alt="Arrow Icon"
                        className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                      />
                    </span>
                  </button>
                </div>
              </form>

              <div className="flex justify-center mt-4">
                <p className="text-sm text-gray-600 inline-block">
                  <button
                    onClick={() => setActiveTab("Sign Up")}
                    className={`font-semibold text-sm text-[#DB0032] hover:text-[#FA6602] transition-all`}
                  >
                    Create An Account
                  </button>
                </p>
              </div>

              <div className="text-xs text-gray-600 flex justify-center gap-1 py-6">
                <span className="mt-1"> By continuing, you agree to the</span>
                <Link to="/terms-and-conditions">
                  <span className="text-sm font-bold text-[#DB0032] hover:text-[#FA6602]  cursor-pointer">
                    Terms, Conditions and Privacy policy.
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Forgot Password
              </h2>
              <p className="text-gray-600 mb-4 text-sm text-center">
                Reset your password by submitting your email address linked to
                your GIBS account. We will send you an email with a link to
                choose a new password.
              </p>
              <hr />
              <br />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
                }}
                className="space-y-4"
              >
                <div className="relative">
                  <label
                    htmlFor="forgotEmail"
                    className="block font-normal mb-1 text-sm"
                  >
                    Email Address
                  </label>
                  <FaEnvelope className="absolute left-3 top-9 text-gray-400 pointer-events-none" />
                  <input
                    id="forgotEmail"
                    type="email"
                    placeholder="Email Address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full border border-gray-300 pl-10 p-2"
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="text-white w-full group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5 flex items-center justify-center"
                  >
                    <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                    <span className="relative text-white group-hover:text-white flex items-center">
                      Reset Password
                      <img
                        src={RightArrow1}
                        alt="Arrow Icon"
                        className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                      />
                    </span>
                  </button>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-[#DB0032] hover:text-[#FA6602] cursor-pointer"
                  >
                    Back to Login
                  </button>
                </div>
              </form>

            </>
          )}
        </div>
      </section>
    </>
  );
}

export default LogIn;
