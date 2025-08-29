// BookCoarseGeneral.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import nationality from "./country.json";

const BookCoarseGeneral = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courses = location.state?.course;
  const courseName = courses?.name || "";
  const courseId = courses?.id || "";
 const [internationalMobile, setInternationalMobile] = useState("");
  const [formData, setFormData] = useState({
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
    disabled: "",
    nature: "",
    terms: "no",
    internationalMobilePhone: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");

  // ADD THESE OPTION ARRAYS - THEY WERE MISSING
  const optionTitle = [
    "Aprof",
    "adv",
    "Brig",
    "Comd",
    "Dr",
    "Ds",
    "Gen",
    "Judge",
    "L+",
    "L+Gen",
    "Mr",
    "Ms",
  ];
  const diataryReq = [
    "None",
    "Halaal",
    "Strick Halaal",
    "Strict Hallal",
    "Kosher",
    "Strict Kosher",
    "Vegeteriahn",
    "Other",
  ];
  const funOrg = [
    "adminstration",
    "board and director developement",
    "chief executive officer",
    "competitiviness",
    "Economics",
    "executive",
    "finance",
    "group HR director",
    "group talent manager",
    "human resources",
    "information technology",
  ];
  const levlOrg = [
    "Executive",
    "general",
    "junior management",
    "middle management",
    "non-executive/board",
    "not specified",
    "other",
    "senior management",
  ];
  const industry = [
    "accounting",
    "Namking",
    "Brockers",
    "Building constructions",
    "chemicals oil and plastics",
    "consulting firms",
  ];
  const gender = ["male", "female", "unknown", "intersex"];
  const populationgrp = ["black", "coloured", "indian", "white", "others"];
  const socialMedia = [
    "facebook",
    "linkedIn",
    "instagram",
    "print advertisiment",
    "radio advertisiment",
    "trade show",
  ];
  const vision = ["Hearing", "Vision", "Mobility", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validateStep = () => {
    let stepErrors = {};
    [
      "title",
      "surname",
      "firstname",
      "preferName",
      "email",
      "diet",
      "company",
      "organisation",
      "levelOrg",
      "sector",
      "nationality",
      "job",
      "gender",
      "population",
      "passport",
      "finding",
      "nature",
      "internationalMobilePhone",
      "disabled",
    ].forEach((f) => {
      if (!formData[f] || formData[f].trim() === "") {
        stepErrors[f] = "This field is required";
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
      navigate("/booking-course/billing", { state: { course: courses } });
    }
  };

  React.useEffect(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

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
          <div className="flex items-center justify-between mb-10 relative">
            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
                1
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                General
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-white">
                Missing Information
              </span>
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-gray-300"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gray-300">
                2
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600">
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

          <form className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div key="title" className="grid gap-1.5">
                <label htmlFor="">Title</label>
                <select
                  id="title"
                  name="title"
                  value={formData.title || ""} // controlled value
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {optionTitle.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {errors.title && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.title}
                  </p>
                )}
              </div>
              <div key="surname" className="grid gap-1.5">
                <label htmlFor="">
                  Surname{" "}
                  <span className="text-gray-400 text-sm">
                    (as per your ID)
                  </span>
                </label>
                <input
                  name="surname"
                  value={formData.surname || ""}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.surname && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.surname}
                  </p>
                )}
              </div>
              <div key="firstName" className="grid gap-1.5">
                <label htmlFor="">
                  First name{" "}
                  <span className="text-gray-400 text-sm">
                    (as per your ID)
                  </span>
                </label>
                <input
                  name="firstname"
                  value={formData.firstname || ""}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div key="preferredName" className="grid gap-1.5">
                <label htmlFor="">Preferred name</label>
                <input
                  type="text"
                  name="preferName"
                  value={formData.preferName || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.preferName && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.preferName}
                  </p>
                )}
              </div>
              <div key="email" className="grid gap-1.5">
                <label htmlFor="">
                  Email address{" "}
                  <span className="text-gray-400 text-sm">
                    (please contact info@theenablement.com to change this email
                    address)
                  </span>
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={formData.email || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.email}
                  </p>
                )}
              </div>
              <div key="dietary" className="grid gap-1.5">
                <label htmlFor="">Dietary requirement</label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {diataryReq.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.diet && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.diet}
                  </p>
                )}
              </div>
              <div key="org" className="grid gap-1.5">
                <label htmlFor="">Organization / Company</label>
                <input
                  name="company"
                  value={formData.company || ""}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.company}
                  </p>
                )}
              </div>
              <div key="funOrg" className="grid gap-1.5">
                <label htmlFor="">Function in organisation</label>
                <select
                  name="organisation"
                  value={formData.organisation || ""}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {funOrg.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.organisation && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.organisation}
                  </p>
                )}
              </div>
              <div key="levelOrg" className="grid gap-1.5">
                <label htmlFor="">Level in organisation</label>
                <select
                  name="levelOrg"
                  value={formData.levelOrg || ""}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {levlOrg.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.levelOrg && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.levelOrg}
                  </p>
                )}
              </div>
              <div key="industry" className="grid gap-1.5">
                <label htmlFor="">Sector / industry</label>
                <select
                  name="sector"
                  value={formData.sector || ""}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {industry.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.sector && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.sector}
                  </p>
                )}
              </div>
              <div key="nationality" className="grid gap-1.5">
                <label htmlFor="nationality">Nationality</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={(e) => {
                    handleChange(e); // updates formData
                    setSelectedCountry(e.target.value); // still keep extra state if needed
                  }}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
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
                {errors.nationality && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.nationality}
                  </p>
                )}
              </div>
              <div key="position" className="grid gap-1.5">
                <label htmlFor="">Position / job title</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="job"
                  value={formData.job || ""}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.job && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.job}
                  </p>
                )}
              </div>
              <div key="gender" className="grid gap-1.5">
                <label htmlFor="">Gender</label>
                <select
                  onChange={handleChange}
                  name="gender"
                  value={formData.gender || ""}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {gender.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.gender}
                  </p>
                )}
              </div>
              <div key="population" className="grid gap-1.5">
                <label htmlFor="">Population group</label>
                <select
                  onChange={handleChange}
                  name="population"
                  value={formData.population || ""}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {populationgrp.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.population && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.population}
                  </p>
                )}
              </div>
              <div key="certificateName" className="grid gap-1.5">
                <label htmlFor="">
                  Name to appear on certificate as per ID/Passport
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="passport"
                  value={formData.passport || ""}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.passport && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.passport}
                  </p>
                )}
              </div>
              <div key="socialMedia" className="grid gap-1.5">
                <label htmlFor="">How did you find out about us?</label>
                <select
                  onChange={handleChange}
                  name="finding"
                  value={formData.finding || ""}
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
                {errors.finding && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.finding}
                  </p>
                )}
              </div>
              <div key="specialNeeds" className="grid gap-4">
                <div className="grid gap-1.5">
                  <label htmlFor="">
                    Physically disabled or special needs?
                  </label>
                  <span className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="disabled"
                        value="yes"
                        checked={formData.disabled === "yes"}
                        onChange={handleChange} // ✅ use handleChange
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="disabled"
                        value="no"
                        checked={formData.disabled === "no"}
                        onChange={handleChange} // ✅ use handleChange
                      />
                      No
                    </label>
                  </span>
                </div>

                {formData.disabled === "yes" && (
                  <div className="grid gap-1.5">
                    <label htmlFor="">
                      Nature of disability{" "}
                      <span className="text-gray-700 text-sm">(optional)</span>
                    </label>
                    <select
                      onChange={handleChange}
                      name="nature"
                      value={formData.nature || ""}
                      required
                      className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                    >
                      <option value="" disabled>
                        -- Please Select --
                      </option>
                      {vision.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.nature && (
                      <p className="text-red-500 text-xs mt-1" id="err">
                        {errors.nature}
                      </p>
                    )}
                  </div>
                )}
              </div>
             { selectedCountry !== "South Africa" && (
              <div key="intlMobile" className="grid gap-1.5">
                <label htmlFor="internationalMobile">
                  International mobile
                </label>
                <input
                  type="text"
                  id="internationalMobile"
                  name="internationalMobilePhone"
                  value={formData.internationalMobilePhone || ""}
                  onChange={(e) => {
                    setInternationalMobile(e.target.value);
                    handleChange(e);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.internationalMobile && (
                  <p className="text-red-500 text-xs mt-1" id="err">
                    {errors.internationalMobilePhone}
                  </p>
                )}
              </div>
            )}
          </div>

            <div className="flex justify-between pt-6">
              <div></div>
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

export default BookCoarseGeneral;
