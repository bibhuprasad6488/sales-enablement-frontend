// BookCoarseGeneral.js - Fixed
import React, { useState, useEffect } from "react";
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

  const [selectedCountry, setSelectedCountry] = useState("");
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
    physicallyDisabled: "no",
    nature: "",
    terms: "no",
    internationalMobilePhone: "",
  });

  const [errors, setErrors] = useState({});

  const capitalizeFirst = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Option arrays
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
  ].map(capitalizeFirst);

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
  ].map(capitalizeFirst);

  const levlOrg = [
    "Executive",
    "general",
    "junior management",
    "middle management",
    "non-executive/board",
    "not specified",
    "other",
    "senior management",
  ].map(capitalizeFirst);

  const industry = [
    "accounting",
    "Namking",
    "Brockers",
    "Building constructions",
    "chemicals oil and plastics",
    "consulting firms",
  ].map(capitalizeFirst);

  const genderOptions = ["male", "female", "unknown", "intersex"].map(
    capitalizeFirst
  );

  const populationgrp = ["black", "coloured", "indian", "white", "others"].map(
    capitalizeFirst
  );

  const socialMedia = [
    "facebook",
    "linkedIn",
    "instagram",
    "print advertisiment",
    "radio advertisiment",
    "trade show",
  ].map(capitalizeFirst);

  const vision = ["Hearing", "Vision", "Mobility", "Other"].map(
    capitalizeFirst
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is filled
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") {
        delete newErrors[name];
      }
      return newErrors;
    });

    // Special handling for country selection
    if (name === "nationality") {
      setSelectedCountry(value);
    }
  };

  const validateStep = () => {
    let stepErrors = {};
    const requiredFields = [
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
      "physicallyDisabled",
    ];

    // Add international mobile if not South Africa
    if (formData.nationality && formData.nationality !== "South Africa") {
      requiredFields.push("internationalMobilePhone");
    }

    // Add nature if disabled is yes
    if (formData.physicallyDisabled === "yes") {
      requiredFields.push("nature");
    }

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        stepErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.email = "Email is invalid";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
      navigate("/booking-course/billing", { state: { course: courses } });
    }
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setSelectedCountry(parsedData.nationality || "");
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
              {/* Title Field */}
              <div className="grid gap-1.5">
                <label htmlFor="title">Title</label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {optionTitle.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Surname Field */}
              <div className="grid gap-1.5">
                <label htmlFor="surname">
                  Surname{" "}
                  <span className="text-gray-400 text-sm">
                    (as per your ID)
                  </span>
                </label>
                <input
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.surname && (
                  <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
                )}
              </div>

              {/* First Name Field */}
              <div className="grid gap-1.5">
                <label htmlFor="firstname">
                  First name{" "}
                  <span className="text-gray-400 text-sm">
                    (as per your ID)
                  </span>
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>

              {/* Preferred Name Field */}
              <div className="grid gap-1.5">
                <label htmlFor="preferName">Preferred name</label>
                <input
                  id="preferName"
                  name="preferName"
                  value={formData.preferName}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.preferName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.preferName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="grid gap-1.5">
                <label htmlFor="email">
                  Email address{" "}
                  <span className="text-gray-400 text-sm">
                    (please contact info@theenablement.com to change this email
                    address)
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={formData.email}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Dietary Requirement Field */}
              <div className="grid gap-1.5">
                <label htmlFor="diet">Dietary requirement</label>
                <select
                  id="diet"
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {diataryReq.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.diet && (
                  <p className="text-red-500 text-xs mt-1">{errors.diet}</p>
                )}
              </div>

              {/* Company Field */}
              <div className="grid gap-1.5">
                <label htmlFor="company">Organization / Company</label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                )}
              </div>

              {/* Function in Organisation Field */}
              <div className="grid gap-1.5">
                <label htmlFor="organisation">Function in organisation</label>
                <select
                  id="organisation"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {funOrg.map((opt, i) => (
                    <option key={i} value={opt} className="capitalize">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.organisation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.organisation}
                  </p>
                )}
              </div>

              {/* Level in Organisation Field */}
              <div className="grid gap-1.5">
                <label htmlFor="levelOrg">Level in organisation</label>
                <select
                  id="levelOrg"
                  name="levelOrg"
                  value={formData.levelOrg}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {levlOrg.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.levelOrg && (
                  <p className="text-red-500 text-xs mt-1">{errors.levelOrg}</p>
                )}
              </div>

              {/* Sector/Industry Field */}
              <div className="grid gap-1.5">
                <label htmlFor="sector">Sector / industry</label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {industry.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.sector && (
                  <p className="text-red-500 text-xs mt-1">{errors.sector}</p>
                )}
              </div>

              {/* Nationality Field */}
              <div className="grid gap-1.5">
                <label htmlFor="nationality">Nationality</label>
                <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {nationality.map((opt, i) => (
                    <option key={i} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                {errors.nationality && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nationality}
                  </p>
                )}
              </div>

              {/* Job Title Field */}
              <div className="grid gap-1.5">
                <label htmlFor="job">Position / job title</label>
                <input
                  id="job"
                  name="job"
                  onChange={handleChange}
                  type="text"
                  value={formData.job}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.job && (
                  <p className="text-red-500 text-xs mt-1">{errors.job}</p>
                )}
              </div>

              {/* Gender Field */}
              <div className="grid gap-1.5">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {genderOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>

              {/* Population Group Field */}
              <div className="grid gap-1.5">
                <label htmlFor="population">Population group</label>
                <select
                  id="population"
                  name="population"
                  value={formData.population}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {populationgrp.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.population && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.population}
                  </p>
                )}
              </div>

              {/* Certificate Name Field */}
              <div className="grid gap-1.5">
                <label htmlFor="passport">
                  Name to appear on certificate as per ID/Passport
                </label>
                <input
                  id="passport"
                  name="passport"
                  onChange={handleChange}
                  type="text"
                  value={formData.passport}
                  required
                  className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                />
                {errors.passport && (
                  <p className="text-red-500 text-xs mt-1">{errors.passport}</p>
                )}
              </div>

              {/* How Did You Find Us Field */}
              <div className="grid gap-1.5">
                <label htmlFor="finding">How did you find out about us?</label>
                <select
                  id="finding"
                  name="finding"
                  value={formData.finding}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                >
                  <option value="">-- Please Select --</option>
                  {socialMedia.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.finding && (
                  <p className="text-red-500 text-xs mt-1">{errors.finding}</p>
                )}
              </div>

              {/* Special Needs Field */}
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <label htmlFor="physicallyDisabled">
                    Physically disabled or special needs?
                  </label>
                  <span className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="physicallyDisabled"
                        value="yes"
                        checked={formData.physicallyDisabled === "yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="physicallyDisabled"
                        value="no"
                        checked={formData.physicallyDisabled === "no"}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </span>
                  {errors.physicallyDisabled && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.physicallyDisabled}
                    </p>
                  )}
                </div>

                {formData.physicallyDisabled === "yes" && (
                  <div className="grid gap-1.5">
                    <label htmlFor="nature">
                      Nature of disability{" "}
                      <span className="text-gray-700 text-sm">(optional)</span>
                    </label>
                    <select
                      id="nature"
                      name="nature"
                      value={formData.nature}
                      onChange={handleChange}
                      className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                    >
                      <option value="">-- Please Select --</option>
                      {vision.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.nature && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nature}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* International Mobile Field (if not South Africa) */}
              {formData.nationality &&
                formData.nationality !== "South Africa" && (
                  <div className="grid gap-1.5">
                    <label htmlFor="internationalMobilePhone">
                      International mobile
                    </label>
                    <input
                      id="internationalMobilePhone"
                      name="internationalMobilePhone"
                      value={formData.internationalMobilePhone}
                      onChange={handleChange}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                    />
                    {errors.internationalMobilePhone && (
                      <p className="text-red-500 text-xs mt-1">
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
