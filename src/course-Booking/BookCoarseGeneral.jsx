// BookCoarseGeneral.js - Fixed
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import nationality from "./country.json";
import axios from "../api/axios";
const BookCoarseGeneral = () => {
  const [sectionComplete, setsectionComplete] = useState("Missing Information");
  const [sectiontik, setsectiontik] = useState("1");
  const location = useLocation();
  const navigate = useNavigate();
  const courses = location.state?.course;
  const courseName = courses?.name || "";
  const courseId = courses?.id || "";
  const user = localStorage.getItem("user_data");

  const userData = JSON.parse(user);
  const usertitle = userData.title || "";
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyNotFound, setCompanyNotFound] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formData, setFormData] = useState({
    title: usertitle,
    surname: "",
    firstname: "",
    preferName: "",
    email: userData.email || "",
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

  const optionTitle = ["Adv", "Dr", "Miss", "Mr", "Mrs", "Ms", "Prof", "Sir"];

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

  // const funOrg = [
  //   "adminstration",
  //   "board and director developement",
  //   "chief executive officer",
  //   "competitiviness",
  //   "Economics",
  //   "executive",
  //   "finance",
  //   "group HR director",
  //   "group talent manager",
  //   "human resources",
  //   "information technology",
  // ].map(capitalizeFirst);

  const funOrg = [
    "Board and Director Development",
    "Chief Executive Officer",
    "Group HR Director",
    "Group Talent Manager",
    "Human Resources",
    "Information Technology",
    "Other",
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
  ].map(capitalizeFirst);

  // const industry = [
  //   "accounting",
  //   "Namking",
  //   "Brockers",
  //   "Building constructions",
  //   "chemicals oil and plastics",
  //   "consulting firms",
  // ].map(capitalizeFirst);

  const industry = [
    "Agriculture & Environment",
    "Mining, Energy & Utilities",
    "Manufacturing & Industrial",
    "Construction & Real Estate",
    "Retail, Wholesale & E-commerce",
    "Transportation & Logistics",
    "Information Technology & Telecommunications",
    "Financial Services",
    "Professional & Business Services",
    "Healthcare & Life Sciences",
    "Education & Training",
    "Media, Marketing & Creative ",
    "Hospitality, Tourism & Leisure",
    "Government & Public Sector",
    "Non-Profit & Social Enterprises",
    "Security & Risk Services",
    "Personal & Lifestyle Services",
    "Startups & Emerging Businesses",
    "Other / Not Listed",
  ];
  const genderOptions = ["Male", "Female", "Prefer not say"];

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
      "preferName",
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
    console.log("Validation errors:", errors);
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setSelectedCountry(parsedData.nationality || "");
    }
  }, []);
  const fetchCompanies = async (search) => {
    try {
      const response = await axios.post("/get-all-companies", { search });
      const data = response.data;

      if (data.data && data.data.length > 0) {
        setCompanyOptions(data.data);
        setCompanyNotFound(false);
      } else {
        setCompanyOptions([]);
        setCompanyNotFound(true);
      }
    } catch (err) {
      // console.error(err);
      setCompanyOptions([]);
      setCompanyNotFound(true);
    }
  };

  const addCompany = async () => {
    try {
      const newCompany = searchValue.trim();
      if (!newCompany) return alert("Please enter a company name");

      await axios.post("/add-company", {
        company_name: newCompany,
        user_id: userData.user_id,
      });

      setFormData((prev) => ({
        ...prev,
        company: newCompany,
      }));
      setSearchValue(newCompany); // keep it visible in input
      setCompanyOptions([]);
      setCompanyNotFound(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add company.");
    }
  };

  useEffect(() => {
    const requiredFields = [
      "title",

      "preferName",
      "company",
      // "organisation",
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

    if (formData.nationality && formData.nationality !== "South Africa") {
      requiredFields.push("internationalMobilePhone");
    }
    if (formData.physicallyDisabled === "yes") {
      requiredFields.push("nature");
    }

    const allFilled = requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );

    const emailValid = formData.email && /\S+@\S+\.\S+/.test(formData.email);

    if (allFilled && emailValid) {
      setsectionComplete("Complete");
      setsectiontik("✔");
    } else {
      setsectionComplete("Missing Information");
      setsectiontik("1");
    }
  }, [formData]);

  return (
    <>
      <section className="w-full   flex justify-center relative py-3">
        <div className="w-full md:w-[95%] px-5 md:px-10 shadow-lg rounded-xl bg-white py-5   sticky top-0">
          <div className="flex items-center justify-between mb-10 gap-3 relative ">
            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
                1
              </div>

              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                General
              </p>
              <span
                className={`mt-1 px-3 py-1 rounded-full  text-xs font-medium  ${sectionComplete === "Missing Information"
                    ? "bg-yellow-400 text-white"
                    : "bg-green-100 text-green-700"
                  } `}
              >
                {sectionComplete}
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
              <div className="grid gap-1.5">
                <label htmlFor="title">Title</label>
                <select
                  id="title"
                  name="title"
                  value={capitalizeFirst(formData.title)}
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
                  value={formData.surname || userData.last_name}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.surname && (
                  <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
                )}
              </div>

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
                  value={formData.firstname || userData.first_name}
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
                  readOnly
                  type="email"
                  value={userData.email}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-1.5 relative">
                <label htmlFor="company">Organization / Company</label>

                <input
                  id="company"
                  name="company"
                  value={searchValue} // keep raw typing here
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchValue(value);

                    if (value.trim()) {
                      fetchCompanies(value.trim());
                    } else {
                      setCompanyOptions([]);
                      setCompanyNotFound(false);
                      setFormData((prev) => ({ ...prev, company: "" }));
                    }
                  }}
                  type="text"
                  required
                  className="w-full px-2 border rounded-lg text-gray-600 bg-slate-100"
                  autoComplete="off"
                  placeholder="Start typing..."
                />

                {/* Dropdown */}
                {(companyOptions.length > 0 || companyNotFound) &&
                  searchValue && (
                    <div
                      className="absolute z-50 w-full bg-white border rounded-md mt-1 max-h-60 overflow-auto shadow-lg"
                      style={{ top: "92px", maxHeight: "300px", overflowY: "auto" }}
                    >
                      {companyOptions.length > 0 ? (
                        <>
                          <div className="px-3 py-2 text-white text-sm bg-[#3B82F6]">
                            -- Please Select --
                          </div>
                          {companyOptions.map((comp) => (
                            <div
                              key={comp.id}
                              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => {
                                setSearchValue(
                                  capitalizeFirst(comp.company_name)
                                );
                                setFormData((prev) => ({
                                  ...prev,
                                  company: comp.company_name,
                                }));
                                setCompanyOptions([]);
                                setCompanyNotFound(false);
                              }}
                            >
                              {capitalizeFirst(comp.company_name)}
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="flex justify-between items-center px-3 py-2">
                          <span className="text-red-500 text-xs">
                            No results found
                          </span>
                          <button
                            type="button"
                            onClick={addCompany}
                            className="px-3 py-1 text-white bg-blue-600 rounded-md text-xs"
                          >
                            Add Company
                          </button>
                        </div>
                      )}
                    </div>
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
                    <option key={i} value={opt} >
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
