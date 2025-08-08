import React, { useState, useEffect } from "react";
import heroImage from "../assets/Logo-banner.png";
import Navbar from "../components/Navbar";
import RightArrow from "../assets/arrow-right.png";
import RightArrow1 from "../assets/arrow-right1.png";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function HeroSection({ heroData }) {
  if (!heroData) return <p></p>;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroData.length]);

  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 48);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + heroData.length) % heroData.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroData.length);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const handleButtonClick = (path) => {
    window.location.href = path;
  };


  return (
    <>
      <section>
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence >
            <motion.div
              key={currentSlide}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroData[currentSlide].image})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>

          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex flex-col lg:flex-row items-center justify-between container mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroData[currentSlide].id}
                  className="lg:w-1/2 text-center lg:text-left h-[500px] flex flex-col justify-center px-4 sm:px-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <motion.h1
                    key={`slide-${currentSlide}`}
                    className="text-2xl sm:text-3xl lg:text-[36px] lg:leading-[48px] font-bold mb-4 mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    {heroData[currentSlide].title}
                  </motion.h1>

                  <motion.p
                    key={`description-${currentSlide}`}
                    className="text-base sm:text-[16px] lg:leading-[34px] bold-text1 lg:text-[18px] mb-6 mx-auto lg:mx-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    {heroData[currentSlide].description}
                  </motion.p>

                  <motion.div
                    key={`buttons-${currentSlide}`}
                    className="flex flex-col lg:flex-row justify-between lg:justify-between items-center gap-4 lg:items-start mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleButtonClick(heroData[currentSlide].btn_one_link)}
                      className="relative uppercase font-medium text-white transition-all duration-300 ease-in-out overflow-hidden group bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none shadow-lg flex items-center justify-center text-sm md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] px-5 py-2.5 w-full md:px-2 md:py-2 lg:px-3 lg:py-3 xl:px-6 xl:py-3 md:w-[250px] lg:w-auto xl:w-auto"
                    >
                      <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                      <span className="relative text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602] flex items-center">
                        {heroData[currentSlide].btn_one_text}
                        <img
                          src={RightArrow1}
                          alt="Arrow Icon"
                          className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out group-hover:hidden" // Hide on hover
                        />
                        <img
                          src={RightArrow}
                          alt="Arrow Icon Hover"
                          className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out hidden group-hover:inline" // Show on hover
                        />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleButtonClick(heroData[currentSlide].btn_two_link)}
                      className="text-white transition-transform duration-500 ease-in-out transform hover:bg-white hover:text-[#DB0032] uppercase w-full justify-center xs:text-[12px] md:w-[250px] lg:w-auto xl:w-auto flex sm:justify-center md:justify-around xl:justify-around lg:justify-around items-center space-x-2 border-2 border-white md:text-[12px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] sm:text-sm px-3 py-2 md:px-6 md:py-2 xl:px-6 xl:py-2.5 2xl:py-3 lg:px-6 lg:py-2.5 sm:px-4 sm:py-2"
                    >
                      {heroData[currentSlide].btn_two_text}
                      <img
                        src={RightArrow}
                        alt="arrow"
                        className="w-6 h-6 ml-2"
                      />
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end hidden lg:flex"
                ref={ref2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: inView2 ? 1 : 0,
                  opacity: inView2 ? 1 : 0,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <img
                  src={heroImage}
                  alt="Hero Section Illustration"
                  className="max-w-full h-auto object-contain lg:object-cover"
                />
              </motion.div>
            </div>

            <div className="container mx-auto px-4">
              <div className="btn-hero-slider space-x-5 gap-3">

                <button
                  onClick={goToPreviousSlide}
                  className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 rounded-full z-50 text-white shadow-lg hover:scale-105 transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-xl`}
                  aria-label="Previous Slide"
                  style={{ transition: "opacity 0.3s ease-in-out" }}
                >
                  <FaArrowLeft className="text-xl text-[#fff] group-hover:text-[#383F71]" />
                </button>

                <button
                  onClick={goToNextSlide}
                  className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 rounded-full z-50 text-white shadow-lg hover:scale-105 transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-2xl`}
                  aria-label="Next Slide"
                  style={{ transition: "opacity 0.3s ease-in-out" }}
                >
                  <FaArrowRight className="text-xl text-[#fff] group-hover:text-[#383F71]" />
                </button>

              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "120px",
                overflow: "hidden",
              }}
            >
              <svg
                viewBox="0 0 200 100"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              >
                <path
                  d={
                    isMobile
                      ? "M0,70 Q100,0 200,70 L200,100 L0,100 Z"
                      : "M0,90 Q100,-68 200,90 L200,100 L0,100 Z"
                  }
                  fill="white"
                />
              </svg>

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                }}
              >
                <svg
                  viewBox="0 0 200 100"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="red" stopOpacity="1" />
                      <stop offset="100%" stopColor="orange" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    d={
                      isMobile
                        ? "M0,70 Q100,0 200,70"
                        : "M0,90 Q100,-68, 200,90"
                    }
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray="565"
                    strokeDashoffset={565 - (progress / 100) * 565}
                    strokeLinejoin="round"
                    strokeLinecap="square"
                    style={{
                      transition: "stroke-dashoffset 0.05s linear",
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
