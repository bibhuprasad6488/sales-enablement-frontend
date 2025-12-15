import React, { useState, useEffect } from "react";
import Phone from "../assets/Phone.webp";
import Mail from "../assets/mail.webp";
import Facebook from "../assets/facebook.webp";
import Instagram from "../assets/instagram.webp";
import Twitter from "../assets/twitter.webp";
import Linkedin from "../assets/linkedin.webp";
import RightArrow1 from "../assets/arrow-right1.webp";
import ModalScheduleForm from "./ModalScheduleForm";
import { FaTimes } from "react-icons/fa";
import { useApi } from "../context/ContactContextApi";
import { useApi3 } from "../context/WebsiteDataContext";
import logoFacebook from "../assets/logoFacebook.webp";
import logoInstagram from "../assets/logoInstagram.webp";
import logoLinkedIn from "../assets/logoLinkedIn.webp";
import logoTwitter from "../assets/logoTwitter.webp";
const Header = () => {
  const { websiteData } = useApi3();
  if (!websiteData) return <p></p>;
  const { contactData, loading } = useApi();
  if (!contactData) return <p></p>;
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
  return (
    <>
      <header className="banner text-white bg-gray-900 sticky top-0 z-40">
        <div className="flex flex-col  sm:flex-col sm:gap-4  md:flex-col lg:flex-row xl:flex-nowrap justify-center  sm:justify-start lg:justify-between items-center container mx-auto px-4 py-3 text-sm">
          <div className="flex flex-col items-center  sm:flex-row sm:space-x-4 mb-3 sm:mb-0">
            <span className="flex items-center space-x-2 mb-2 group sm:mb-0 cursor-pointer">
              <img
                loading="lazy"
                src={Phone}
                alt="Phone"
                className="w-[26px] h-[26px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-blue-500"
              />
              <span className="xl:inline text-sm md:text-sm lg:text-sm sm:text-xs">
                {websiteData.phone}
              </span>
            </span>
            <span className="flex items-center space-x-2 group cursor-pointer">
              <img
                loading="lazy"
                src={Mail}
                alt="Mail"
                className="w-[26px] h-[26px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:p1 group-hover:ring-blue-500"
              />
              <span className="sm:inline text-sm lg:text-sm md:text-sm sm:text-xs">
                {websiteData.email}
              </span>
            </span>
          </div>

          <div className="flex space-x-6 sm:space-x-8 mb-3 sm:mb-0">
            <a
              href={websiteData.facebook_link}
              aria-label="Facebook"
              className="group"
            >
              <img
                loading="lazy"
                src={logoFacebook}
                alt="Facebook"
                className="w-10 h-10 transition-all cursor-pointer duration-300 ease-in-out hover:scale-[1.1]"
              />
            </a>
            <a
              href={websiteData.instagram_link}
              aria-label="Instagram"
              className="group"
            >
              <img
                loading="lazy"
                src={logoInstagram}
                alt="Instagram"
                className="w-10 h-10 transition-all cursor-pointer duration-300 ease-in-out hover:scale-[1.1]"
              />
            </a>
            <a
              href={websiteData.twitter_link}
              aria-label="Twitter"
              className="group"
            >
              <img
                loading="lazy"
                src={logoTwitter}
                alt="Twitter"
                className="w-10 h-10 transition-all cursor-pointer duration-300 ease-in-out hover:scale-[1.1]"
              />
            </a>
            <a
              href={websiteData.linkedin_link}
              aria-label="LinkedIn"
              className="group"
            >
              <img
                loading="lazy"
                src={logoLinkedIn}
                alt="LinkedIn"
                className="w-10 h-10 transition-all cursor-pointer duration-300 ease-in-out hover:scale-[1.1]"
              />
            </a>
          </div>

          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <a
              type="button"
              target="_blank"
              href={websiteData.footer_btn_link}
              className="text-white h-10 transition-all duration-500 ease-in-out transform bg-transparent hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white sm:h-10 md:h-12 lg:h-12 xl:h-14 flex items-center uppercase space-x-2 border-btn border-white font-bold text-xs lg:text-sm sm:text-xs px-3 py-2 md:px-6 sm:px-4 sm:py-2"
            >
              <span>{websiteData.footer_btn}</span>
              <img
                loading="lazy"
                src={RightArrow1}
                alt="Arrow"
                className="w-[16px] sm:w-[20px] h-[16px] sm:h-[20px] transition-transform duration-500 ease-in-out hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
