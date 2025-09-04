import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhoneAlt,
  FaEye,
  FaEyeSlash,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import RightArrow1 from "../assets/arrow-right1.png";
import axios from "../api/axios"
import { toast, ToastContainer } from "react-toastify";
import { useTab } from "../context/TabContext";
function SignUp() {
  const { setActiveTab } = useTab();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [signUpData, setSignUpData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    phone_no: "",
    email_id: "",
    password: "",
    confirmPassword: "",
    marketingConsent: false,
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false); 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const [errors, setErrors] = useState({});

  const titles = ["Adv", "Dr", "Miss", "Mr", "Mrs", "Ms", "Prof", "Sir"];


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const validateFields = () => {
    let tempErrors = {};
    if (!signUpData.title) tempErrors.title = "Title is required.";
    if (!signUpData.first_name) tempErrors.first_name = "First name is required.";
    if (!signUpData.last_name) tempErrors.last_name = "Last name is required.";
    if (!signUpData.phone_no) tempErrors.phone_no = "Phone Number is required.";
    if (!signUpData.email_id) tempErrors.email_id = "Email is required.";
    if (!signUpData.password) tempErrors.password = "Password is required.";
    if (!signUpData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required.";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    if (!signUpData.termsAccepted) tempErrors.termsAccepted = "You must accept the Terms & Conditions.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      toast.error("Please fix the errors in the form.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post("/register", signUpData);
      console.log("Response:", response.data); // Debugging
  
      if (response.data.status && response.data.message) {
        console.log("Success Message:", response.data.message);

        toast.success(response.data.message, { toastId: "registerSuccess" });

        setTimeout(() => {
          setSignUpData({
            title: "",
            first_name: "",
            last_name: "",
            phone_no: "",
            email_id: "",
            password: "",
            confirmPassword: "",
            marketingConsent: false,
            termsAccepted: false,
          });

          setErrors({});
          setActiveTab("Login");
        }, 1500); // Delay reset
      } else {
        // Error: parse the message string to JSON
        let errors = {};
        try {
          errors = JSON.parse(response.data.message);
        } catch (e) {
          console.log("Failed to parse error message:", e);
        }

        // Show first error as toast
        for (const key in errors) {
          if (Array.isArray(errors[key]) && errors[key].length > 0) {
            toast.error(errors[key][0], { toastId: `error_${key}` });
            break;
          }
        }
      }
    } catch (err) {
      let errorMessage = err.response?.data?.message || "Something went wrong!";
      console.error("Error:", errorMessage);
      toast.error(errorMessage, { toastId: "registerError" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <section className=" py-12 flex items-center justify-center ">
        <div className="max-w-xl w-full bg-white p-4 md:p-8 lg:p-10  py-6  shadow-xl mx-4 md:mx-6 lg:mx-8">
          <h2 className="sm:text-3xl text-2xl font-extrabold mb-4 text-center text-gray-800">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-6 text-sm text-center leading-relaxed capitalize">
            Start your journey of sales enablement with us
          </p>
          <ToastContainer />
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="title"
                className="block font-normal mb-1 text-sm "
              >
                Title
              </label>
              <select
                id="title"
                name="title"
                value={signUpData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
              >
                <option value="" disabled selected className="font-normal">
                  Select Your Title
                </option>
                {titles.map((title, index) => (
                  <option key={index} value={title.toLowerCase()}>
                    {title}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-10  text-gray-400 pointer-events-none" />
              {errors.title && (
                <p className="text-red-500 text-xs mt-2">{errors.title}</p>
              )}
            </div>
            {[
              { label: "First Name", name: "first_name", icon: <FaUser /> },
              { label: "Last Name", name: "last_name", icon: <FaUser /> },
              {
                label: "Phone Number",
                name: "phone_no",
                icon: <FaPhoneAlt />,
                type: "number",
              },
              {
                label: "Email Address",
                name: "email_id",
                icon: <FaEnvelope />,
                type: "email",
              },
            ].map(({ label, name, icon, type = "text" }) => (
              <div key={name} className="relative">
                <label htmlFor={name} className="block text-sm font-medium">
                  {label}
                </label>
                <input
                  id={name}
                  min="0"
                  type={type}
                  name={name}
                  value={signUpData[name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="w-full border border-gray-300  px-10 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                <span className="absolute left-3 top-9 text-gray-400">
                  {icon}
                </span>
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <div className="relative">
              <label
                htmlFor="password"
                className="block font-normal mb-1 text-sm"
              >
                Password
              </label>
              <FaLock className="absolute left-3 top-9 text-gray-400 pointer-events-none" />
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Create a password"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                autoComplete="off"
                className="w-full border border-gray-300  px-10 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="mt-2 text-xs text-gray-500 flex justify-between">
                <div className="rounded-full px-1 mx-2 flex justify-center align-middle text-gray h-4 w-4 border-2 border-gray-500">
                  i
                </div>
                <div>
                  <i className="text-gray-400">
                    Note: The password must contain a minimum of 8 characters
                    with 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special
                    character.
                  </i>
                </div>
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block font-normal mb-1 text-sm"
              >
                Confirm Password
              </label>
              <FaLock className="absolute left-3 top-9  text-gray-400 pointer-events-none" />
              <input
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Re-enter your password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
                className="w-full border border-gray-300  px-10 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="may-we-send"
                type="checkbox"
                name="marketingConsent"
                checked={signUpData.marketingConsent}
                onChange={handleChange}
                className="checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
              />
              <label
                htmlFor="may-we-send"
                className="text-xs text-gray-600 cursor-pointer"
              >
                May we send you marketing material via email and other
                electronic channels?
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="terms-and-conditions"
                type="checkbox"
                name="termsAccepted"
                checked={signUpData.termsAccepted}
                onChange={handleChange}
                className="checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
              />
              <label
                htmlFor="terms-and-conditions"
                className="text-xs cursor-pointer text-gray-600"
              >
                I agree to the{" "}
                <Link to="/terms-and-conditions">
                  <span className="text-sm font-bold text-[#DB0032] hover:text-[#FA6602] cursor-pointer">
                    Terms, Conditions, and Privacy Policy.
                  </span>
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs mt-1">
                {errors.termsAccepted}
              </p>
            )}

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="text-white w-full group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5   flex items-center justify-center"
              >
                <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                <span className="relative text-white group-hover:text-white flex items-center">
                  {loading ? "Registering..." : "Sign Up"}
                  <img
                    src={RightArrow1}
                    alt="Arrow Icon"
                    className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                  />
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6 justify-around flex space-x-3">
            <p className="text-sm text-gray-600 inline-block">
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("Login")}
                className={`font-semibold text-sm text-[#DB0032] hover:text-[#FA6602] transition-all`}
              >
                Login
              </button>
            </p>
            <div className="font-bold">|</div>
            <div className="text-sm text-gray-600">
              If you require support{" "}
              <a
                href="/contact-us"
                className="text-[#DB0032] hover:text-[#FA6602] "
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaUser,
//   FaLock,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaEye,
//   FaEyeSlash,
//   FaChevronDown,
// } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import { useTab } from "../context/TabContext";
// import axios from "../api/axios";

// function SignUp() {
//   const { setActiveTab } = useTab();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [signUpData, setSignUpData] = useState({
//     title: "",
//     first_name: "",
//     last_name: "",
//     phone_no: "",
//     email_id: "",
//     password: "",
//     confirmPassword: "",
//     marketingConsent: false, // Optional checkbox
//     termsAccepted: false, // Mandatory checkbox
//   });

//   const [errors, setErrors] = useState({});

//   const titles = ["Adv", "Dr", "Miss", "Mr", "Mrs", "Ms", "Prof", "Sir"];

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSignUpData({
//       ...signUpData,
//       [name]: type === "checkbox" ? checked : value
//     });
//   };

//   // Validate form fields
//   const validateFields = () => {
//     let tempErrors = {};
//     if (!signUpData.title) tempErrors.title = "Title is required.";
//     if (!signUpData.first_name) tempErrors.first_name = "First name is required.";
//     if (!signUpData.last_name) tempErrors.last_name = "Last name is required.";
//     if (!signUpData.phone_no) tempErrors.phone_no = "Phone Number is required.";
//     if (!signUpData.email_id) tempErrors.email_id = "Email is required.";
//     if (!signUpData.password) tempErrors.password = "Password is required.";
//     if (!signUpData.confirmPassword) {
//       tempErrors.confirmPassword = "Confirm Password is required.";
//     } else if (signUpData.password !== signUpData.confirmPassword) {
//       tempErrors.confirmPassword = "Passwords do not match.";
//     }
//     if (!signUpData.termsAccepted) tempErrors.termsAccepted = "You must accept the Terms & Conditions.";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateFields()) {
//       toast.error("Please fix the errors in the form.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("/register", signUpData);
//       if (response.data.status) {
//         toast.success(response.data.message);
//         setSignUpData({
//           title: "",
//           first_name: "",
//           last_name: "",
//           phone_no: "",
//           email_id: "",
//           password: "",
//           confirmPassword: "",
//           marketingConsent: false,
//           termsAccepted: false,
//         });
//         setErrors({});
//         setActiveTab("Login");
//       }
//     } catch (err) {
//       let errorMessage = err.response?.data?.message || "Something went wrong!";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <section className="flex items-center justify-center py-12">
//         <div className="bg-white p-6 md:p-8 lg:p-10 shadow-xl rounded-lg max-w-lg w-full">
//           <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create Your Account</h2>
//           <p className="text-gray-600 text-center mb-6">Start your journey toward greater success with our platform.</p>
//           <ToastContainer />

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             {/* Title */}
//             <div className="relative">
//               <label htmlFor="title" className="block text-sm font-medium">Title</label>
//               <select
//                 id="title"
//                 name="title"
//                 value={signUpData.title}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2"
//               >
//                 <option value="" disabled>Select Your Title</option>
//                 {titles.map((title, index) => (
//                   <option key={index} value={title.toLowerCase()}>{title}</option>
//                 ))}
//               </select>
//               <FaChevronDown className="absolute right-3 top-10 text-gray-400 pointer-events-none" />
//               {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
//             </div>
//             {/* Input Fields */}
//             {[
//               { label: "First Name", name: "first_name", icon: <FaUser /> },
//               { label: "Last Name", name: "last_name", icon: <FaUser /> },
//               { label: "Phone Number", name: "phone_no", icon: <FaPhoneAlt />, type: "number" },
//               { label: "Email Address", name: "email_id", icon: <FaEnvelope />, type: "email" },
//             ].map(({ label, name, icon, type = "text" }) => (
//               <div key={name} className="relative">
//                 <label htmlFor={name} className="block text-sm font-medium">{label}</label>
//                 <input
//                   id={name}
//                   type={type}
//                   name={name}
//                   value={signUpData[name]}
//                   onChange={handleChange}
//                   placeholder={`Enter your ${label.toLowerCase()}`}
//                   className="w-full border border-gray-300 px-3 py-2 pl-10 rounded-md focus:outline-none focus:ring-2"
//                 />
//                 <span className="absolute left-3 top-9 text-gray-400">{icon}</span>
//                 {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
//               </div>
//             ))}

//             {/* Password Fields */}
//             {[
//               { label: "Password", name: "password", state: passwordVisible },
//               { label: "Confirm Password", name: "confirmPassword", state: confirmPasswordVisible },
//             ].map(({ label, name, state }) => (
//               <div key={name} className="relative">
//                 <label htmlFor={name} className="block text-sm font-medium">{label}</label>
//                 <input
//                   id={name}
//                   type={state ? "text" : "password"}
//                   name={name}
//                   value={signUpData[name]}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 px-3 py-2 pl-10 rounded-md focus:outline-none focus:ring-2"
//                 />
//                 <button type="button" onClick={() => toggleVisibility(name)} className="absolute right-3 top-9 text-gray-400">
//                   {state ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//                 {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
//               </div>
//             ))}
//             {/* Checkbox: Optional - Marketing Material */}
//             <div className="flex gap-2 items-center">
//               <input
//                 id="may-we-send"
//                 type="checkbox"
//                 name="marketingConsent"
//                 checked={signUpData.marketingConsent}
//                 onChange={handleChange}
//                 className="checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
//               />
//               <label htmlFor="may-we-send" className="text-xs text-gray-600 cursor-pointer">
//                 May we send you marketing material via email and other electronic channels?
//               </label>
//             </div>

//             {/* Checkbox: Mandatory - Terms & Conditions */}
//             <div className="flex gap-2 items-center">
//               <input
//                 id="terms-and-conditions"
//                 type="checkbox"
//                 name="termsAccepted"
//                 checked={signUpData.termsAccepted}
//                 onChange={handleChange}
//                 className="checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
//               />
//               <label htmlFor="terms-and-conditions" className="text-xs cursor-pointer text-gray-600">
//                 I agree to the{" "}
//                 <Link to="/terms-and-conditions">
//                   <span className="text-sm font-bold text-[#DB0032] hover:text-[#FA6602] cursor-pointer">
//                     Terms, Conditions, and Privacy Policy.
//                   </span>
//                 </Link>
//               </label>
//             </div>
//             {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}

//             {/* Submit Button */}
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-medium">
//               {loading ? "Registering..." : "Sign Up"}
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default SignUp;
