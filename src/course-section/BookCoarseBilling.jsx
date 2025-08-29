// BookCoarseBilling.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import nationality from "./country.json";

const BookCoarseBilling = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courses = location.state?.course;
  const courseName = courses?.name || "";

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          account: "",
          country: "",
          postalAd_1: "",
          postalAd_2: "",
          city: "",
          sendingEmail: "",
        };
  });

  const [errors, setErrors] = useState({});
  const socialMedia = [
    "facebook",
    "linkedIn",
    "instagram",
    "print advertisiment",
    "radio advertisiment",
    "trade show",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") delete newErrors[name];
      return newErrors;
    });
  };

  const validateStep = () => {
    let stepErrors = {};
    [
      "account",
      "country",
      "postalAd_1",
      "postalAd_2",
      "city",
      "sendingEmail",
    ].forEach((f) => {
      if (!formData[f] || formData[f].trim() === "")
        stepErrors[f] = "This field is required";
    });
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
      navigate("/booking-course/legal", { state: { course: courses } });
    }
  };

  const prevStep = () => {
    sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
    navigate("/booking-course/general", { state: { course: courses } });
  };

  return (
    <>
      <section>
        <div className="relative w-full h-full course-bg">
          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
                Booking Courses
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Course", to: "/" },
                  { label: "Booking Courses", to: "/booking-course/general" },
                  { label: "Billing Details" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <h1 className="text-center mt-10 text-4xl font-black uppercase">
        {courseName}
      </h1>

      <section className="px-2 md:px-10 flex justify-center bg-white relative py-10">
        <div className="w-full md:w-[70%] shadow-lg rounded-xl bg-white p-8 sticky top-0">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-green-500">
                ✔
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                General
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Completed
              </span>
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-green-500"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
                2
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                Billing Details
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-white">
                Missing Information
              </span>
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-gray-300"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gray-300">
                3
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600">
                Legal
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-white">
                Missing Information
              </span>
            </div>
          </div>

          {/* Form fields */}
          <form className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-1.5">
                <label htmlFor="">Responsible for account</label>
                <select
                  name="account"
                  value={formData.account || ""}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {socialMedia.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.account && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.account}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="">Country</label>
                <select
                  onChange={(e) => {
                    handleChange(e); // updates formData
                    setSelectedCountry(e.target.value); // still keep extra state if needed
                  }}
                  name="country"
                  required
                  value={formData.country}
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {nationality.map((opt, i) => (
                    <option key={i} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="">Postal address line 1</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="postalAd_1"
                  value={formData.postalAd_1 || ""}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.postalAd_1 && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.postalAd_1}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="">
                  Postal address line 2{" "}
                  <span className="text-gray-400"> (optional)</span>{" "}
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="postalAd_2"
                  value={formData.postalAd_2 || ""}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.postalAd_2 && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.postalAd_2}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="">Town / city</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="city"
                  value={formData.city || ""}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="">Email to send invoice to</label>
                <input
                  type="email"
                  onChange={handleChange}
                  name="sendingEmail"
                  value={formData.sendingEmail || ""}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.sendingEmail && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.sendingEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:opacity-90 transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookCoarseBilling;
