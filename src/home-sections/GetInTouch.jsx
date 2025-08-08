import React, { useState } from "react";
import GetInTouchImg from "../assets/getintouch.png";
import RightArrow from "../assets/arrow-right.png";
import RightArrow1 from "../assets/arrow-right1.png";
import PhoneIncome from "../assets/phone-incoming.png";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

function GetInTouch() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!recaptchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log({ name, phone, email, description, recaptchaToken });
      alert("Form submitted successfully!");
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };


  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <section className="banner overflow-hidden get-in-touch-margin">
      <div className="container py-12  mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              GET IN TOUCH!{" "}
              <img
                src={PhoneIncome}
                alt="Phone Icon"
                className="w-9 h-9 inline-block ml-2"
              />
            </h3>
            <p className="text-sm text-white sm:text-[16px] md:text-[16px]  bold-text1 leading-[32px] text-justify  mt-6">
              We help optimize sales strategies, enhance team performance, and
              create tailored solutions to unlock your sales team's potential.
            </p>
            <h5 className="text-3xl md:text-3xl font-bold text-white mt-6">
              We Are Here To Help!
            </h5>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="flex flex-col items-center sm:flex sm:items-center space-y-4 xl:space-y-0 md:flex md:items-center sm:flex-col lg:flex-col lg:space-x-0 xl:flex-row xl:space-x-6">
                <div className="w-full">

                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-gray-600 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#DB0032] focus:border-[#DB0032]"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="w-full">
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-gray-600 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#DB0032] focus:border-[#DB0032]"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                </div>

              </div>

              <div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-gray-600 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#DB0032] focus:border-[#DB0032]"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}


              </div>
              <div>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-gray-600 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#DB0032] focus:border-[#DB0032]"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}

              </div>

              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div>
                  <ReCAPTCHA
                    sitekey="your-site-key"
                    onChange={handleRecaptchaChange}
                  />
                  {errors.recaptcha && (
                    <p className="text-red-500 text-sm">{errors.recaptcha}</p>
                  )}
                </div>

                <button

                  type="submit"
                  className="relative text-white group h-20 transition-transform duration-500 ease-out transform bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none font-medium text-xs sm:text-sm px-12 py-4 md:px-3 md:py-4 lg:px-6 lg:py-4 xl:px-12 xl:py-4 2xl:px-12 2xl:py-4 flex items-center justify-center w-full md:w-auto"
                >
                  <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  <span className="relative text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602] flex items-center">
                    CONNECT NOW
                    <span className="relative w-6 h-6 ml-2 flex items-center justify-center">
                      <img
                        src={RightArrow1}
                        alt="Right Arrow"
                        className="absolute w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-0" // Hide on hover
                      />
                      <img
                        src={RightArrow}
                        alt="Right Arrow Hover"
                        className="absolute w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" // Show on hover
                      />
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <motion.div
            className="w-full mt-8 md:mt-0  "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
          >
            <img
              src={GetInTouchImg}
              alt="Get In Touch"
              className="w-full max-w-xl mx-auto h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GetInTouch;
