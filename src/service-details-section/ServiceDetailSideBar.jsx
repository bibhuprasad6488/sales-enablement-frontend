import React, { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaClipboardCheck,
  FaCogs,
  FaSearch,

} from "react-icons/fa";

import { BsArrowRight } from "react-icons/bs"; 

const ServiceDetailSideBar = ({ course }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const services = [
    { title: "Sales Force Evaluation", icon: <FaChartLine /> },
    { title: "Recruiting Process Optimization", icon: <FaUsers /> },
    { title: "Sales Candidate Assessments", icon: <FaClipboardCheck /> },
    { title: "CRM Selection, Installation, and Integration", icon: <FaCogs /> },
    { title: "Sales Process Optimization", icon: <FaSearch /> },
  ];

  return (
    <aside className="w-full h-full  lg:w-1/3 xl:w-2/5 2xl:w-1/3 bg-gray-100 p-6 shadow-lg md:block">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Our Services
      </h2>

      <div className="space-y-4 mb-8">
        {services.map((service, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between bg-white p-4 cursor-pointer icon-hover rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] transition-all duration-300">
              <div className="flex items-center space-x-2">
                <div className="text-red-600 icon-hover2">{service.icon}</div>
                <span className="font-medium">{service.title}</span>
              </div>
              <BsArrowRight />
            </div>

            {index === 4 && (
              <div
                className="flex items-center justify-between bg-white p-4 cursor-pointer icon-hover rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] transition-all duration-300"
                onClick={() => (window.location.href = "/our-services")}
              >
                <div className="flex items-center space-x-2">
                  <div className="text-blue-600 icon-hover2">🎉</div>
                  <span className="font-medium">More Services</span>
                </div>
                <BsArrowRight />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="py-6 px-4 bg-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Get Updates
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Subscribe via email and get the latest news, updates, and exclusive
          offers.
        </p>
        <div className="mt-6 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row md:flex-col lg:flex-col xl:flex-row gap-2 max-w-md w-full bg-white p-2 rounded-lg shadow-md"
          >
            <input
              type="email"
              placeholder="Email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-t-md sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-3 sm:mb-0"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 relative  flex items-center justify-center group bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-t-md sm:rounded-r-md  transition"
            >
              <span className="absolute inset-0 w-0 h-full   bg-[#060b33] rounded-r-md transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
              <span className="relative text-white group-hover:text-white flex items-center">

                Subscribe</span>
            </button>
          </form>
        </div>

        {isSubscribed && (
          <div className="mt-4 text-center text-green-600">
            Thank you for subscribing!
          </div>
        )}
      </div>
    </aside>
  );
};

export default ServiceDetailSideBar;
