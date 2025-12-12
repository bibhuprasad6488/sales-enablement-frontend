import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);


  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed  right-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 rounded-full z-50 text-white shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        } hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-2xl`}
      style={{ transition: "opacity 0.3s ease-in-out", bottom: "69px" }}
    >
      <FaArrowUp className="text-xl text-[#fff] group-hover:text-[#383F71]" />
    </button>

  );
};

export default ScrollToTopButton;
