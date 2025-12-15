import React, { useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { MdOutlineDescription, MdOutlineSupportAgent } from "react-icons/md";
import GetInTouchImg from "../assets/getintouch.webp";
import RightArrow from "../assets/arrow-right.webp";
import RightArrow1 from "../assets/arrow-right1.webp";
import PhoneIncome from "../assets/phone-incoming.webp";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../api/axios";
import { toast } from "react-toastify";
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
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!recaptchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      cf_name: e.target.name.value,
      cf_company: e.target.company.value,
      cf_phone: e.target.phone.value,
      cf_inquiry_type: e.target.inquiry.value,
      cf_message: e.target.message.value,
      cf_email: e.target.email.value,
    };

    try {
      setLoading(true);
      const response = await axios.post("/contact-form-store", payload);
      setLoading(false);

      if (response.data.status) {
        toast.success(response.data.message);
        e.target.reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred while sending the message.");
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
                loading="lazy"
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

           
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="relative flex items-center">
                <FaUser className="absolute left-3 text-gray-400 top-1/2 -translate-y-1/2 peer-focus:text-[#060B33]" />
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your Name*"
                  className="peer w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060B33] transition duration-300 ease-in-out hover:border-[#060B33]"
                />
              </div>

              {/* Company */}
              <div className="relative flex items-center">
                <FaBuilding className="absolute left-3 text-gray-500 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="company"
                  required
                  placeholder="Company Name*"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060B33] transition duration-300 ease-in-out hover:border-[#060B33]"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email Address*"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060B33] transition duration-300 ease-in-out hover:border-[#060B33]"
                />
                <FaEnvelope className="absolute left-3 text-gray-500 top-1/2 -translate-y-1/2" />
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone Number*"
                  maxLength={10}
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060B33] transition duration-300 ease-in-out hover:border-[#060B33]"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
                <FaPhoneAlt className="absolute left-3 text-gray-500 top-1/2 -translate-y-1/2" />
              </div>

              {/* Inquiry Select */}
              <div className="relative">
                <select
                  id="inquiry"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060B33] transition duration-300 ease-in-out hover:border-[#060B33]"
                >
                  <option value="" disabled>
                    Select Inquiry Type
                  </option>
                  <option value="demo">Request a Demo</option>
                  <option value="consultation">Consultation</option>
                  <option value="support">Support</option>
                  <option value="general">General Inquiry</option>
                </select>
                <MdOutlineSupportAgent className="absolute left-3 text-gray-500 top-6 -translate-y-1/2" />
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="message"
                  required
                  rows="3"
                  placeholder="Your Message*"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060B33] transition duration-300 ease-in-out hover:border-[#060B33]"
                ></textarea>
                <MdOutlineDescription className="absolute left-3 text-gray-500 top-6 -translate-y-1/2" />
              </div>

              {/* Recaptcha + Button full width row */}
              {/* Recaptcha + Button full-width row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                {/* <div className="flex justify-center md:justify-start">
                  <ReCAPTCHA
                    sitekey="your-site-key"
                    onChange={handleRecaptchaChange}
                  />
                  {errors.recaptcha && (
                    <p className="text-red-500 text-sm">{errors.recaptcha}</p>
                  )}
                </div> */}

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative uppercase font-medium text-white transition-all duration-300 ease-in-out overflow-hidden group bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none shadow-lg flex items-center justify-center text-base px-5 py-3 w-full"
                >
                  <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                  <span className="relative flex items-center">
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
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
              loading="lazy"
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
