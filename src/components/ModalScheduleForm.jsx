import React, { useState } from "react";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaChalkboardTeacher,
  FaRegCalendarCheck,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "../api/axios"

const ModalScheduleForm = () => {

  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    mobile: "",
    type: "",
    desc: "",
    date_time: "",
    mode: "",
  })

  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultationForm({
      ...consultationForm,
      [name]: value
    })
  }

  const validateFields = () => {
    let tempErrors = {}
    if (!consultationForm.name) tempErrors.name = " Name is required"
    if (!consultationForm.email) tempErrors.email = "Email  is required"
    if (!consultationForm.mobile) tempErrors.mobile = "Mobile Number is required"
    if (!consultationForm.type) tempErrors.type = "Consultation Type is required"
    if (!consultationForm.date_time) tempErrors.date_time = "Date & Time is required"
    if (!consultationForm.mode) tempErrors.mode = "Mode is required"

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0
  }



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
      const url = "consultations";

      const formatDateTime = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

      const payload = {
        name: consultationForm.name,
        email: consultationForm.email,
        mobile: consultationForm.mobile,
        type: consultationForm.type,
        desc: consultationForm.desc,
        date_time: formatDateTime(consultationForm.date_time),
        mode: consultationForm.mode,
      };

      const response = await axios.post(url, payload);

      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }

      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      console.error("Error:", error);
    }
  };



  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-md border border-gray-200 rounded-lg overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-2 max-h-[80vh] py-2 "
      >
        <h2 className="text-2xl font-bold text-center uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
          Book Your Consultation
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Fill in the form below, and our team will get back to you promptly.
        </p>

        <div>
          <div className="relative mb-4">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <input
              type="text"
              id="name"
              className="w-full pl-10 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"
              name="name"
              value={consultationForm.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <input
              type="email"
              id="email"

              className="w-full pl-10 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"
              name="email"
              value={consultationForm.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="relative mb-4">
            <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <input
              type="number"
              id="mobile"
              className="w-full pl-10 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"
              name="mobile"
              value={consultationForm.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="relative mb-4">
            <FaChalkboardTeacher className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <select
              id="consultationType"
              className="w-full pl-10 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"

              name="type"

              value={consultationForm.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Consultation Type</option>
              <option value="Initial">Initial Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Product Demo">Product Demo</option>
              <option value="Technical Support">Technical Support</option>
            </select>
          </div>

          <div className="relative mb-4">
            <MdOutlineDescription className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <textarea
              id="consultationPurpose"
              className="w-full pl-10 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"
              name="desc"
              value={consultationForm.desc}

              onChange={handleChange}
              placeholder="Describe the purpose of your consultation"
              rows="4"
            />
          </div>

          <div className="relative mb-4">
            <FaRegCalendarCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <input
              type="datetime-local"
              id="dateTime"
              className="w-full pl-10 p-3 border  border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"
              name="date_time"
              value={consultationForm.date_time}
              onChange={handleChange}
              onFocus={(e) => e.target.showPicker()} 
              required
            />


          </div>

          <div className="relative mb-4">
            <FaChalkboardTeacher className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#060B33]" />
            <select
              id="mode"
              className="w-full pl-10 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060B33]"
              name="mode"
              value={consultationForm.mode}
              onChange={handleChange}
              required
            >
              <option value="">Select Mode</option>
              <option value="In-person">In-person</option>
              <option value="Video Call">Video Call</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Chat">Chat</option>
            </select>
          </div>
        </div>

        <div className="text-center mb-4">
          <button
            type="submit"
            className="text-white group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5 w-full md:px-6 md:py-3  flex items-center justify-center"
          >
            <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
            <span className="relative md:text-[13px] text-white group-hover:text-[#fff] flex items-center">
              Schedule a Consultation
              <FaArrowRight
                className="w-4 h-4 ml-2  transition-transform duration-300 ease-in-out group-hover:text-[#fff]"  // Change color on hover to red
              />
            </span>
          </button>
        </div>
      </form>

    </div>
  );
};

export default ModalScheduleForm;
