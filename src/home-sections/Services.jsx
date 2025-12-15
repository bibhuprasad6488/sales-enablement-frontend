import React, { useState } from "react";
import RightArrow from "../assets/arrow-right.webp";
import ServiceArrow from "../assets/service-arrow.webp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { useApi } from "../context/ServiceContextApi";

function Services({ consultationData }) {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.5 });
  const { serviceData } = useApi();

  if (!consultationData) return null;
  if (!Array.isArray(serviceData)) {
    console.error("serviceData is not an array:", serviceData);
    return null;
  }
  const cardsPerPage = 4;
  const totalPages = Math.ceil(serviceData.length / cardsPerPage);
  const currentCards = serviceData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );
  const handleCardClick = (id) => {
    if (id === clickedCard) {
      setClickedCard(null);
      setShowDescription(false);
    } else {
      setClickedCard(id);
      setShowDescription(false);
      setTimeout(() => {
        setShowDescription(true);
      }, 500);
    }
  };
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePrev = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <section className="py-12 services-top-margin container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        <motion.div
          className="w-full  text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={leftVariants}
        >
          <h5 className="text-[16px] md:text-[24px] sm:text-[24px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
            {consultationData.sub_title}
          </h5>
          <h2 className="text-[18px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7">
            <span
              className="about-intro-title"
              dangerouslySetInnerHTML={{ __html: consultationData.title }}
            />
          </h2>
          <p className="text-sm sm:text-[14px] md:text-[16px] leading-[32px] text-justify mb-8">
            {consultationData.description}
          </p>
          <button
            onClick={() => {
              navigate("/sales-enablement-that-drives-measurable-growth");
            }}
            type="button"
            className="text-[#000] transition-transform duration-500 ease-out transform  h-12 w-full justify-center  flex space-x-5 gap-6 uppercase items-center font-bold text-xs sm:text-sm md:px-20 lg:px-20 sm:w-full xl:w-auto 2xl:w-auto  md:w-auto xl:px-20   md:py-6 sm:px-16 py-4 hover:text-[#000] border border-[#000] sm:justify-center md:justify-between border-btn2"
          >
            {consultationData.btn_text}
            <img src={RightArrow} alt="Right Arrow" className="w-6 h-6" />
          </button>
        </motion.div>

        <div className="relative flex justify-center service-margin text-white w-full">
          <div className="relative flex  justify-center items-center text-white w-full  mb-6">
            <motion.div
              className="w-full p-8 flex justify-center items-center"
              ref={ref2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: inView2 ? 1 : 0,
                opacity: inView2 ? 1 : 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative hidden sm:block w-full sm:w-3/4 md:w-1/2">
                {currentCards.map((card, index) => {
                  let positionClass = "";
                  let transformOrigin = "";
                  let margin = "m-4";

                  if (index === 0) {
                    positionClass = "absolute bottom-0 right-1/2";
                    transformOrigin = "bottom right";
                  } else if (index === 1) {
                    positionClass = "absolute top-1/2 left-1/2";
                    transformOrigin = "left center";
                  } else if (index === 2) {
                    positionClass = "absolute top-1/2 right-1/2";
                    transformOrigin = "right center";
                  } else if (index === 3) {
                    positionClass = "absolute bottom-0 left-1/2";
                    transformOrigin = "bottom center";
                  }

                  return (
                    <div
                      key={`${card.id}-${index}`} // Unique key using id and index
                      onClick={() => handleCardClick(index)} // Use index for click tracking
                      className={`transition-all cursor-pointer duration-500 transform 
                        ${positionClass} ${margin} 
                             ${clickedCard === index ? "scale-110 z-10" : ""} 
                            hover:shadow-lg hover:opacity-90`}
                      style={{
                        backgroundImage: `url(${card.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: clickedCard === index ? "290px" : "180px",
                        height: clickedCard === index ? "290px" : "180px",
                        transition: "all 0.3s ease",
                        transformOrigin: transformOrigin,
                        transform: clickedCard === index ? "scale(1)" : "",
                      }}
                    >
                      <Link
                        className="h-full flex flex-col justify-between bg-layer1 p-5 transition-all duration-300"
                        to={
                          card.indp === "1"
                            ? `/service/sales-force-details/${card.slug}`
                            : card.indp === "2"
                            ? `/service/sales-candidate-details/${card.slug}`
                            : `/service/${card.slug}`
                        }
                      >
                        <h3 className="text-[14px] uppercase font-bold flex justify-center items-center">
                          {card.title}
                        </h3>

                        <div className="flex justify-start items-center">
                          {clickedCard === index && showDescription && (
                            <p
                              className="absolute text-sm leading-6 lg:leading-4 lg:text-[13px] xl:leading-6 xl:text-[16px] 2xl:leading-6 2xl:text-[16px] bold-text1 top-16 w-[90%] text-white prose"
                              dangerouslySetInnerHTML={{
                                __html:
                                  card.description.length > 120
                                    ? `${card.description.slice(0, 150)}...`
                                    : card.description,
                              }}
                            ></p>
                          )}

                          <Link
                            to={
                              card.indp === "1"
                                ? `/service/sales-force-details/${card.slug}`
                                : card.indp === "2"
                                ? `/service/sales-candidate-details/${card.slug}`
                                : `/service/${card.slug}`
                            }
                          >
                            {clickedCard === index ? (
                              <span className="w-10 h-10 border-2 text-red-500 border-red-500 bg-text flex items-center justify-center">
                                <FaArrowRight className="text-xl" />
                              </span>
                            ) : (
                              <span className="w-10 h-10 text-red-500 bg-text flex items-center justify-center">
                                <LuPlus className="text-lg w-7 h-7" />
                              </span>
                            )}
                          </Link>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="sm:hidden">
                <div className="w-full flex flex-wrap align-middle justify-center">
                  {currentCards.map((card) => (
                    <div
                      key={card.id}
                      className="transition-all duration-500 transform m-4"
                      style={{
                        backgroundImage: `url(${card.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "290px",
                        height: "290px",
                      }}
                    >
                      <div className="h-full flex justify-center items-center bg-layer1 p-5">
                        <h3 className="text-[14px] uppercase font-bold">
                          {card.title}
                        </h3>

                        {/* <p
                          className="absolute text-sm leading-6 lg:leading-4 lg:text-[13px] xl:leading-6 xl:text-[16px] 2xl:leading-6 2xl:text-[16px] bold-text1 top-16 w-[90%] text-white prose"
                          dangerouslySetInnerHTML={{
                            __html:
                              card.description.length > 120
                                ? `${card.description.slice(0, 150)}...`
                                : card.description,
                          }}
                        ></p> */}
                        <Link
                          to={
                            card.indp === "1"
                              ? `/service/sales-force-details/${card.slug}`
                              : card.indp === "2"
                              ? `/service/sales-candidate-details/${card.slug}`
                              : `/service/${card.slug}`
                          }
                        >
                          <img
                            loading="lazy"
                            src={ServiceArrow}
                            alt="Service Arrow"
                            className="w-7 h-7"
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* <div className="xl:mt-24 lg:mt-5 md:mt-[110px] 2xl:mt-28 sm:mt-[110px]  flex justify-end ">
        <div className="flex  gap-4 z-10">
          <button
            onClick={handlePrev}
            className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 hover:scale-110 rounded-full z-50 text-white shadow-lg transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-xl`}
            aria-label="Previous Slide"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <FaArrowLeft className="text-xl text-[#fff] group-hover:text-[#383F71]" />
          </button>
          <button
            onClick={handleNext}
            className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 hover:scale-110 rounded-full z-50 text-white shadow-lg transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-2xl`}
            aria-label="Next Slide"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <FaArrowRight className="text-xl text-[#fff] group-hover:text-[#383F71]" />
          </button>
        </div>
      </div> */}
    </section>
  );
}

export default Services;
