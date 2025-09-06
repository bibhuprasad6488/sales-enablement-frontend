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

import { toast, ToastContainer } from "react-toastify";
import { IoCall } from "react-icons/io5";
import CallToDiscussForm from "../components/CallToDiscussForm";
import { useNavigate } from "react-router-dom";
import { useApi3 } from "../context/WebsiteDataContext";
import logoFacebook from "../assets/logoFacebook.png";
import logoInstagram from "../assets/logoInstagram.png";
import logoLinkedIn from "../assets/logoLinkedIn.png";
import logoTwitter from "../assets/logoTwitter.png";
const PriceSideBar = ({ course }) => {
  const { websiteData } = useApi3();
  const currentUrl = window.location.href;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const shareTo = (platform) => {
    if (isMobile && navigator.share) {
      navigator
        .share({
          title: "the-sales-enablement",
          text: "Have a look at this website",
          url: currentUrl,
        })
        .catch((err) => console.log("Share cancelled", err));
      return;
    }
    let webUrl = "";
    switch (platform) {
      case "facebook":
        webUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "twitter":
        webUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "linkedin":
        webUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "instagram":
        webUrl = `https://instagram.com`; 
        break;
      default:
        return;
    }

    window.open(webUrl, "_blank");
  };
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
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login-signup", { state: { activeTab: "login" } });
      }, 2000);
    } else {
      toast.success("Proceeding to booking...", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/booking-course/general", { state: { course } });
      }, 1000);
    }
  };

  return (
    <>
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
                R {course.fees}
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

          <button
            className="w-full md:w-auto flex-1 uppercase relative group bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white p-2 sm:p-3 flex items-center justify-center "
            onClick={() => shareTo("facebook")}
          >
            <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>

            <span className="relative z-10 text-white group-hover:text-white flex items-center">
              <div className="absolute right-[-60px] bottom-[-90px] mb-2 border-2 border-[#f04512] bg-white rounded-lg shadow-xl p-3 gap-4 z-50 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 hidden md:flex">
                <a
                  onClick={() => shareTo("facebook")}
                  className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={logoFacebook}
                    alt="Share on Facebook"
                    className="w-full h-full object-contain"
                  />
                </a>

                <a
                  onClick={() => shareTo("twitter")}
                  className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={logoTwitter}
                    alt="Share on Twitter"
                    className="w-full h-full object-contain"
                  />
                </a>

                <a
                  onClick={() => shareTo("linkedin")}
                  className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={logoLinkedIn}
                    alt="Share on LinkedIn"
                    className="w-full h-full object-contain"
                  />
                </a>

                <a
                  onClick={() => shareTo("instagram")}
                  className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={logoInstagram}
                    alt="Share on Instagram"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>

              <FaShareAlt className="mr-2" />
              <span className="text-sm">Share</span>
            </span>
          </button>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export default PriceSideBar;
