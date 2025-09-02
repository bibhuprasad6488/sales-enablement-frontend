import React, { useState, useEffect } from "react";
import Phone from "../assets/Phone.png";
import Mail from "../assets/mail.png";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import Twitter from "../assets/twitter.png";
import Linkedin from "../assets/linkedin.png";
import RightArrow1 from "../assets/arrow-right1.png";
import ModalScheduleForm from "./ModalScheduleForm";
import { FaTimes } from "react-icons/fa";
import { useApi } from "../context/ContactContextApi";
import { useApi3 } from "../context/WebsiteDataContext";
import logoFacebook from "../assets/logoFacebook.png";
import logoInstagram from "../assets/logoInstagram.png";
import logoLinkedIn from "../assets/logoLinkedIn.png";
import logoTwitter from "../assets/logoTwitter.png";
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
                src={Mail}
                alt="Mail"
                className="w-[26px] h-[26px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:p1 group-hover:ring-blue-500"
              />
              <span className="sm:inline text-sm lg:text-sm md:text-sm sm:text-xs">
                {websiteData.email}
              </span>
            </span>
          </div>

          <div className="flex space-x-10 mb-3 sm:mb-0">
            <a
              href={websiteData.facebook_link}
              aria-label="Facebook"
              className="group"
            >
              <img
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

// import React, { useState, useEffect } from "react";
// import Phone from "../assets/Phone.png";
// import Mail from "../assets/mail.png";
// import Facebook from "../assets/facebook.png";
// import Instagram from "../assets/instagram.png";
// import Twitter from "../assets/twitter.png";
// import Linkedin from "../assets/linkedin.png";
// import RightArrow1 from "../assets/arrow-right1.png";
// import { FaArrowDown, FaTimes } from "react-icons/fa";
// import ModalScheduleForm from "./ModalScheduleForm";

// const Header = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the header on small devices

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prevState) => !prevState); // Toggle the state of the menu
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isModalOpen]);

//   return (
//     <>
//       <header className="banner text-white bg-gray-900 sticky top-0 z-40">
//         <div className="flex flex-col sm:flex-col sm:gap-4 md:flex-col lg:flex-row xl:flex-nowrap justify-center sm:justify-start lg:justify-between items-center container mx-auto px-4 py-3 text-sm">
//           <div className="sm:hidden md:hidden flex justify-between items-center w-full mb-3">
//             <button onClick={toggleMenu} className="text-white text-xl">
//               {isMenuOpen ? (
//                 <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602]   w-6 h-6 rounded-full flex justify-center items-center">  <FaTimes className="text-xl" /> </span>
//               ) : (
//                 <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] absolute top-7 left-1/2  w-6 h-6 rounded-full flex justify-center items-center">
//                   <FaArrowDown className="text-base text-white" />
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Contact Info */}
//           <div className={`flex flex-col items-center sm:flex-row sm:space-x-4 mb-3 sm:mb-0 ${isMenuOpen ? "block" : "hidden sm:flex sm:flex-col md:flex-col lg:flex-row sm:space-x-4 sm:mb-0"}`}>
//             <span className="flex items-center space-x-2 mb-2 group sm:mb-0 cursor-pointer">
//               <img
//                 src={Phone}
//                 alt="Phone"
//                 className="w-[26px] h-[26px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-blue-500"
//               />
//               <span className="xl:inline text-sm md:text-sm lg:text-sm sm:text-xs">
//                 010 335-1182
//               </span>
//             </span>
//             <span className="flex items-center space-x-2 group cursor-pointer">
//               <img
//                 src={Mail}
//                 alt="Mail"
//                 className="w-[26px] h-[26px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:p1 group-hover:ring-blue-500"
//               />
//               <span className="sm:inline text-sm lg:text-sm md:text-sm sm:text-xs">
//                 info@theenablement.com
//               </span>
//             </span>
//           </div>

//           {/* Social Icons */}
//           <div className={`flex space-x-10 mb-3 sm:mb-0 ${isMenuOpen ? "block" : "hidden sm:flex"}`}>
//             <a href="#" aria-label="Facebook" className="group">
//               <img
//                 src={Facebook}
//                 alt="Facebook"
//                 className="w-[28px] sm:w-[28px] lg:w-[34px] lg:h-[34px] md:w-[28px] md:h-[28px] xl:h-[40px] xl:w-[40px] h-[28px] sm:h-[28px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-blue-500"
//               />
//             </a>
//             <a href="#" aria-label="Instagram" className="group">
//               <img
//                 src={Instagram}
//                 alt="Instagram"
//                 className="w-[28px] sm:w-[28px] lg:w-[34px] lg:h-[34px] md:w-[28px] md:h-[28px] xl:h-[40px] xl:w-[40px] h-[28px] sm:h-[28px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-pink-500"
//               />
//             </a>
//             <a href="#" aria-label="Twitter" className="group">
//               <img
//                 src={Twitter}
//                 alt="Twitter"
//                 className="w-[28px] sm:w-[28px] lg:w-[34px] lg:h-[34px] md:w-[28px] md:h-[28px] xl:h-[40px] xl:w-[40px] h-[28px] sm:h-[28px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-blue-400"
//               />
//             </a>
//             <a href="#" aria-label="LinkedIn" className="group">
//               <img
//                 src={Linkedin}
//                 alt="LinkedIn"
//                 className="w-[28px] sm:w-[28px] lg:w-[34px] lg:h-[34px] md:w-[28px] md:h-[28px] xl:h-[40px] xl:w-[40px] h-[28px] sm:h-[28px] transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-blue-600"
//               />
//             </a>
//           </div>

//           <div className={`flex justify-center sm:justify-end w-full sm:w-auto ${isMenuOpen ? "block" : "hidden sm:flex"}`}>
//             <button
//               type="button"
//               onClick={openModal}
//               className="text-white h-10 transition-all duration-500 ease-in-out transform bg-transparent hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white sm:h-10 md:h-12 lg:h-12 xl:h-14 flex items-center uppercase space-x-2 border-btn border-white font-bold text-xs lg:text-sm sm:text-xs px-3 py-2 md:px-6 sm:px-4 sm:py-2"
//             >
//               <span>Schedule A Consultation</span>
//               <img
//                 src={RightArrow1}
//                 alt="Arrow"
//                 className="w-[16px] sm:w-[20px] h-[16px] sm:h-[20px] transition-transform duration-500 ease-in-out hover:translate-x-1"
//               />
//             </button>
//           </div>

//           {/* Modal for Consultation */}
//           {isModalOpen && (
//             <div
//               className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50 text-[#000]"
//               onClick={(e) => {
//                 if (e.target === e.currentTarget) {
//                   closeModal();
//                 }
//               }}
//             >
//               <div className="p-4 sm:p-4 lg:p-4 rounded-md relative ">
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl md:text-3xl transition-all duration-300 ease-in-out bg-transparent p-2 rounded-full"
//                 >
//                   <span className="text-black text-2xl hover:text-red-600 transition-all duration-300 ease-in-out font-semibold">
//                     <FaTimes />
//                   </span>
//                 </button>

//                 <ModalScheduleForm />
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;
