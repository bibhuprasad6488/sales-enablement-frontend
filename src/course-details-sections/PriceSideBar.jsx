import React, { useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import {
  FaEnvelope,
  FaGlobeAmericas,
  FaPhoneAlt,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { IoCall } from "react-icons/io5";
import CallToDiscussForm from "../components/CallToDiscussForm";
import { useNavigate } from "react-router-dom";
import { useApi3 } from "../context/WebsiteDataContext";
const PriceSideBar = ({ course }) => {
 const { websiteData } = useApi3();
  console.log(websiteData.phone);
  const currentUrl = window.location.href;
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = new Date(course.end_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedDate1 = new Date(course.start_date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
 
  
  const today = new Date();
  const startDate = new Date(course.app_open_date);
  const endDate = new Date(course.app_close_date);
  const closingSoonThreshold = 3;
  const isValidDate = (date) => date instanceof Date && !isNaN(date);
  const isBeforeStart = isValidDate(startDate) && today < startDate;
  const isApplicationOpen =
    isValidDate(startDate) &&
    isValidDate(endDate) &&
    today >= startDate &&
    today <= endDate;
  const isClosingSoon =
    isValidDate(endDate) &&
    (endDate - today) / (1000 * 60 * 60 * 24) <= closingSoonThreshold &&
    today < endDate;
  const isClosed = isValidDate(endDate) && today > endDate;
  const formattedStartDate = isValidDate(startDate)
    ? startDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";
  const formattedEndDate = isValidDate(endDate)
    ? endDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      toast.error("You need to log in first!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login-signup");
    } else {
      toast.success("Proceeding to booking...", {
        position: "top-right",
        autoClose: 2000,
      });
      console.log("Proceeding to booking...");
    }
  };

  return (
    <section className="w-full  bg-white p-4 sm:p-6 hover:scale-105 transition-transform duration-200 shadow-2xl mx-auto ">
      <div>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-base sm:text-lg font-semibold uppercase">
            {course.name}
          </h2>
          <div
            className={`flex items-center justify-center gap-1 rounded-md px-2 py-2 transition-all duration-300 ${
              isHovered
                ? "bg-white text-[#DB0032]"
                : "text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
            }`}
          >
            <div className="flex items-center gap-2">
              {course?.course_type}
              {course?.course_type === "Offline" ? (
                <>
                  <BsBuildings />
                </>
              ) : course?.course_type === "Virtual" ? (
                <>
                  <FaGlobeAmericas />
                </>
              ) : (
                <span>Unknown Mode</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {isBeforeStart ? (
            <div className="text-sm sm:text-md text-gray-500 font-bold">
              Applications opening soon
              <div className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
                {" "}
                {formattedStartDate} - {formattedEndDate}
              </div>
            </div>
          ) : isApplicationOpen ? (
            <>
              <label className="block text-xs sm:text-sm bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text mb-2">
                Application Open Between
              </label>
              <div className="text-sm sm:text-md bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text font-bold">
                {formattedStartDate} - {formattedEndDate}
              </div>
            </>
          ) : isClosed ? (
            <div className="text-sm sm:text-md text-gray-500 font-bold">
              Applications are currently closed
              <div className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
                {" "}
                {formattedEndDate} - {formattedEndDate}
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-4">
          <div>
            <span className="text-xs font-light">To Start by:</span>
            <div className="text-sm font-light"> {formattedDate1}</div>
          </div>
          <div>
            <span className="text-xs font-light">To End by:</span>
            <div className="text-sm font-light">{formattedDate}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-4">
          <div>
            <span className="text-xs font-light">Cost</span>
            <div className="text-sm sm:text-md bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text font-bold">
              $ {course.fees}
            </div>
          </div>
          <div>
            <span className="text-xs font-light">Venue</span>
            <div className="text-sm text-gray-700">{course.type_address}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-between items-start gap-4">
          <div className="text-xs font-light text-gray-600">
            <div>For Enquiries</div>
            <div className="flex items-center mt-2">
              <FaEnvelope className="text-gray-700 mr-2" />
              <div className="text-sm font-bold text-gray-700">
                {websiteData.email}
              </div>
            </div>
          </div>
          <div className="text-xs font-light text-gray-600">
            <div>Contact Number</div>
            <div className="flex items-center mt-2">
              <FaPhoneAlt className="text-gray-700 mr-2" />
              <div className="text-sm font-bold text-gray-700">
                {websiteData.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {isApplicationOpen ? (
          // <button className="w-full relative uppercase group text-xs sm:text-sm bg-gradient-to-r from-[#DB0032] to-[#FA6602] cursor-pointer text-white p-2 sm:p-3 flex items-center justify-center">
          //   <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
          //   <span className="relative z-10 text-white group-hover:text-white flex items-center">
          //     Book Now
          //   </span>
          // </button>

          <button
            onClick={handleClick}
            className="w-full relative uppercase group text-xs sm:text-sm bg-gradient-to-r from-[#DB0032] to-[#FA6602] cursor-pointer text-white p-2 sm:p-3 flex items-center justify-center"
          >
            <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
            <span className="relative z-10 text-white group-hover:text-white flex items-center">
              Book Now
            </span>
          </button>
        ) : isBeforeStart ? (
          <div className="w-full text-center text-sm sm:text-md font-bold text-gray-500 bg-yellow-400 p-2 sm:p-3 ">
            Opening Soon
          </div>
        ) : (
          <div
            className="w-full text-center text-sm cursor-pointer sm:text-md font-bold text-white bg-gray-500 p-2 sm:p-3 "
            onClick={openModal}
          >
            Closed - Call for Discuss
          </div>
        )}
      </div>

      {/* {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50 text-[#000]"
          onClick={(e) => {
            // Close modal if clicked outside the modal content area
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="p-4 sm:p-4 lg:p-4 rounded-md relative ">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl md:text-3xl transition-all duration-300 ease-in-out bg-transparent  p-2 rounded-full"
            >


              <span className="text-black text-2xl hover:text-red-600 transition-all duration-300 ease-in-out  font-semibold">
                <FaTimes />
              </span>
            </button>

            <CallToDiscussForm />
          </div>
        </div>
      )} */}

      <div className="mt-4 flex flex-wrap justify-between gap-4">
        <button className="w-full md:w-auto flex-1 uppercase relative group bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white p-2 sm:p-3 flex items-center justify-center ">
          <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
          <a
            className="relative z-10 text-white group-hover:text-white flex items-center"
            href={`tel:${websiteData.phone}`}
          >
            <IoCall className="mr-2" />
            <span className="text-sm">Call Us</span>
          </a>
        </button>
        <button className="w-full md:w-auto flex-1 uppercase relative group bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white p-2 sm:p-3 flex items-center justify-center ">
          <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
          <span className="relative z-10 text-white group-hover:text-white flex items-center">
            <div className="absolute right-[-60px] bottom-[-50px] bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out p-2 space-x-0.5 flex gap-3">
              <a
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      currentUrl
                    )}`,
                    "_blank"
                  );
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={18} className="text-white text-xl" />
              </a>
              <span>
                <hr className="h-full w-[1px] border-0 bg-white flex justify-self-center self-center" />
              </span>
              <a
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      currentUrl
                    )}`,
                    "_blank"
                  );
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={18} className="text-white text-xl" />
              </a>
              <span>
                <hr className="h-full w-[1.4px] border-0 bg-white flex justify-self-center self-center" />
              </span>
              <a
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      currentUrl
                    )}`,
                    "_blank"
                  );
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={18} className="text-white text-xl" />
              </a>
              <span>
                <hr className="h-full w-[1px] border-0 bg-white flex justify-self-center self-center" />
              </span>
              <a
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault(); // stop auto navigation
                  navigator.clipboard.writeText(window.location.href);

                  window.open("https://instagram.com", "_blank"); // optional: still open Instagram site
                }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={18} className="text-white text-xl" />
              </a>
            </div>
            <FaShareAlt className="mr-2" />
            <button className="text-sm">Share</button>
          </span>
        </button>
      </div>
    </section>
  );
};
export default PriceSideBar;
