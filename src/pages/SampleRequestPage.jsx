import React, { useState } from "react";
import { Link } from "react-router-dom";
import RightArrow1 from "../assets/arrow-right1.webp";
import HeroSRP from "../srp-section/HeroSRP";
import FooterSubscribe from "../home-sections/FooterSubscribe";

const SampleRequestPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
    salesTeamSize: "",
    partner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <HeroSRP />
      <div className="container mx-auto px-4 py-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              SEC Sample Request
            </h1>
            <p className="text-lg text-gray-600">
              SEC Assessments can be used to enhance recruiting or to identify
              areas for improvement in an existing Sales Team. This assessment
              was built for sales, not adapted. As a result, the findings are
              sales-specific, accurate, and predictive.
            </p>
            <p className="text-lg text-gray-600">
              Download our Free Sample Assessments by filling out the form on
              the right and see for yourself how powerful the insight and
              analysis provided by SEC could be for your organization.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Sample Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="interest" className="block text-gray-700">
                  I'm interested in:
                </label>
                <select
                  name="interest"
                  id="interest"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Interest</option>
                  <option value="Assessing sales candidates">
                    Assessing sales candidates
                  </option>
                  <option value="Assessing my current sales team">
                    Assessing my current sales team
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="salesTeamSize" className="block text-gray-700">
                  How many individuals are currently in your sales organization?
                </label>
                <input
                  type="number"
                  name="salesTeamSize"
                  id="salesTeamSize"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.salesTeamSize}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="partner" className="block text-gray-700">
                  If you learned about us from an OMG Partner, who or which
                  company was it?
                </label>
                <input
                  type="text"
                  name="partner"
                  id="partner"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.partner}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <div className="text-center">
                  <Link
                    type="submit"
                    className="text-white group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5 w-full md:px-6 md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto flex items-center justify-center"
                  >
                    <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                    <span className="relative text-white group-hover:text-white flex items-center">
                      Schedule a Consultation
                      <img
                        loading="lazy"
                        src={RightArrow1}
                        alt="Arrow Icon"
                        className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FooterSubscribe />
    </>
  );
};

export default SampleRequestPage;
