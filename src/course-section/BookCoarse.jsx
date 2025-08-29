import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import nationality from "./country.json";
import { useLocation } from "react-router-dom";
const BookCoarse = () => {
  const location = useLocation();
  const courses = location.state?.course;
  const courseName = courses?.name || "";
  const courseId = courses?.id || "";
  
  // const [accepted, setAccepted] = useState("no");
  const [specialNeeds, setSpecialNeeds] = useState("no");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [internationalMobile, setInternationalMobile] = useState("");

  const steps = ["General", "Billing Details", "Legal"];
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

  // ✅ All keys lowercase + consistent
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
    disabled: "no",
    nature: "",
    terms: "no",
    internationalMobilePhone: "",
  });

  const [errors, setErrors] = useState({});
const [step, setStep] = useState(1);
// console.log("count",step);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // ✅ clear error for this field when user types
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

  if (step === 1) {
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
  }

  if (step === 2) {
    [
      "account",
      "country",
      "postalAd_1",
      "postalAd_2",
      "city",
      "sendingEmail",
    ].forEach((f) => {
      if (!formData[f] || formData[f].trim() === "") {
        stepErrors[f] = "This field is required";
      }
    });
  }

  if (step === 3 && formData.terms !== "yes") {
    stepErrors.terms = "You must accept the terms";
  }

  setErrors(stepErrors);
  return Object.keys(stepErrors).length === 0;
};

  const nextStep = () => {
    // console.log("jiiiiiiiiiiiii");
    
    if (validateStep()) {
      console.log("hii", step);
      
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
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
                  { label: "Booking Courses" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <h1 className="text-center mt-10 text-4xl font-black uppercase">
        {courseName}
      </h1>

      <section className="px-2 md:px-10 flex justify-center bg-white  relative py-10">
        <div className="w-full md:w-[70%] shadow-lg rounded-xl bg-white p-8 sticky top-0">
          <div className="flex items-center justify-between mb-10 relative">
            {steps.map((label, index) => {
              const isActive = step === index + 1;
              const isCompleted = step > index + 1;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {/* Circle */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 
            ${
              isActive
                ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                : isCompleted
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
                  >
                    {isCompleted ? "✔" : index + 1}
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-2 text-xs sm:text-sm font-medium ${
                      isActive ? "text-[#DB0032]" : "text-gray-600"
                    }`}
                  >
                    {label}
                  </p>

                  {/* Status Badge */}
                  <span
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-400 text-white"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Missing Information"}
                  </span>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 
              ${
                isCompleted
                  ? "bg-green-500"
                  : isActive
                  ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                  : "bg-gray-300"
              }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {(() => {
                  // Collect all your input/select divs into an array
                  const formFields = [
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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

                    <div key="email" className="grid gap-1.5">
                      <label htmlFor="">
                        Email address{" "}
                        <span className="text-gray-400 text-sm">
                          (please contact info@theenablement.com to change this
                          email address)
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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                    </div>,

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
                            <span className="text-gray-700 text-sm">
                              (optional)
                            </span>
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
                    </div>,

                    selectedCountry !== "South Africa" && (
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
                    ),
                  ].filter(Boolean); // remove nulls

                  // split logic
                  const midpoint = Math.ceil(formFields.length / 2);
                  const firstHalf = formFields.slice(0, midpoint);
                  const secondHalf = formFields.slice(midpoint);

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">{firstHalf}</div>
                      <div className="space-y-4">{secondHalf}</div>
                    </div>
                  );
                })()}
              </>
            )}

            {step === 2 && (
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
            )}

            {step === 3 && (
              <>
                <div className="grid gap-1.5">
                  <label>
                    By selecting “Yes” you are indicating that you have read and
                    accepted our Website and Privacy Policies{" "}
                    <b className="text-blue-900 hover:text-red-500 cursor-pointer">
                      (click here to read)
                    </b>
                    and accept the cancellation policy applicable to this
                    programme.
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
              </>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:opacity-90 transition"
                >
                  Next
                </button>
              ) : (
                formData.terms === "yes" && ( // ✅ Only show Book Now if Yes
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:opacity-90 transition"
                  >
                    Book Now
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookCoarse;
