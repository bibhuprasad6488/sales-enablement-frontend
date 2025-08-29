// BookCoarseLegal.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-toastify";

const BookCoarseLegal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courses = location.state?.course;
  const courseName = courses?.name || "";

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    return savedData ? JSON.parse(savedData) : { terms: "no" };
  });

  const [errors, setErrors] = useState({});

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
    if (formData.terms !== "yes")
      stepErrors.terms = "You must accept the terms";
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateStep()) {
    console.log("Form submitted:", formData);
    toast.success("Form submission Sucessfully")

    // Clear form data from state
    setFormData({
      title: "",
      surname: "",
      firstname: "",
      preferName: "",
      email: "",
      diet: "",
      company: "",
      organisation: "",
      levelOrg: "",
      sector: "",
      nationality: "",
      job: "",
      gender: "",
      population: "",
      passport: "",
      finding: "",
      account: "",
      country: "",
      postalAd_1: "",
      postalAd_2: "",
      city: "",
      sendingEmail: "",
      disabled: "no",
      nature: "",
      terms: "no",
      internationalMobilePhone: "",
    });

    // Clear session storage
    sessionStorage.removeItem("bookingFormData");

    // Optional: Redirect to home or confirmation page
    // navigate("/");
  }
};
  const prevStep = () => {
    navigate("/booking-course/billing", { state: { course: courses } });
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
                  { label: "Legal" },
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
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-green-500">
                ✔
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                Billing Details
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Completed
              </span>
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-green-500"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
                3
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                Legal
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-white">
                Missing Information
              </span>
            </div>
          </div>

          {/* Form fields */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid gap-1.5">
              <label>
                By selecting "Yes" you are indicating that you have read and
                accepted our Website and Privacy Policies{" "}
                <b className="text-blue-900 hover:text-red-500 cursor-pointer">
                  (click here to read)
                </b>
                and accept the cancellation policy applicable to this programme.
              </label>

              <p className="mt-2">Accept terms</p>

              <span className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="terms"
                    value="yes"
                    checked={formData.terms === "yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="terms"
                    value="no"
                    checked={formData.terms === "no"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </span>

              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Back
              </button>

              {formData.terms === "yes" && (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:opacity-90 transition"
                >
                  Book Now
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookCoarseLegal;
