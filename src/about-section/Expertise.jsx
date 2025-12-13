import React, { useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaFacebookF, FaLinkedinIn, FaPlus, FaTwitter } from "react-icons/fa";
const Expertise = ({expertsData}) => {
  const sliderRef = useRef(null);

 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToPreviousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };


  if (!expertsData || !Array.isArray(expertsData) || expertsData.length === 0) {
    return <p className="text-center text-white"></p>;
  }

  return (
    <section className="py-6 container mx-auto px-6">
      <h5 className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
        Meet our Expertise
      </h5>

      <h2 className="text-[18px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7">
        experienced{" "}
        <span className="ml-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
          consultants and trainers
        </span>
      </h2>

      <p className="uppercase text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-[32px] text-justify mb-8">
        Our team is comprised of experienced consultants and trainers, each with
        a unique set of skills to help your sales team succeed.
      </p>

      <Slider ref={sliderRef} {...settings} className="px-4">
        {expertsData.map((expert, index) => (
          <motion.div
            key={expert.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col border-2 border-orange-500 hover:shadow-xl transition-shadow duration-300 min-h-[550px] lg:h-[550px] md:h-[500px] sm:h-[450px] mx-auto w-full sm:w-[85%] md:w-[75%] lg:w-[65%] max-w-[400px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="h-1/2 border-b-2 border-orange-500">
              <img
                loading="lazy"
                src={expert.profile}
                alt={expert.profile}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-1/2 flex flex-col justify-center p-6 text-center transition-colors duration-300 group hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
              <h3 className="text-lg uppercase font-semibold text-gray-800 group-hover:text-white">
                {expert.name}
              </h3>
              <p className="text-sm uppercase text-gray-500 group-hover:text-gray-200 mt-2">
                {expert.skill}
              </p>
              <p className="text-gray-600 text-sm mt-3 group-hover:text-gray-100">
                <span className="font-bold group-hover:text-gray-200 text-black uppercase">
                  Expertise:{" "}
                </span>
                {expert.description}
              </p>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="relative group">
                <div
                  className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-3 rounded-full cursor-pointer flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{ width: "50px", height: "50px" }}
                >
                  <FaPlus className="text-white text-xl font-bold" />
                </div>

                <div className="absolute bottom-full right-0 mb-0.5 hidden group-hover:flex flex-col space-y-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 rounded-full">
                  <a href={expert.facebook_url}>
                    {" "}
                    <FaFacebookF
                      className="text-white cursor-pointer hover:text-gray-600 text-xl transition-colors duration-300"
                      title="Facebook"
                    />{" "}
                  </a>
                  <a href={expert.linkedin_url}>
                    <FaLinkedinIn
                      className="text-white cursor-pointer hover:text-gray-600 text-xl transition-colors duration-300"
                      title="LinkedIn"
                    />
                  </a>
                  <a href={expert.twitter_url}>
                    <FaTwitter
                      className="text-white cursor-pointer hover:text-gray-600 text-xl transition-colors duration-300"
                      title="Twitter"
                    />{" "}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
      <div className="container mx-auto px-4 mt-6 flex justify-center lg:justify-end">
        <div className="btn-hero-slider space-x-5 gap-3">
          <button
            onClick={goToPreviousSlide}
            className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 rounded-full z-50 text-white shadow-lg transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-xl`}
            aria-label="Previous Slide"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <FaArrowLeft className="text-xl text-[#fff] group-hover:text-[#383F71]" />
          </button>
          <button
            onClick={goToNextSlide}
            className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 rounded-full z-50 text-white shadow-lg transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-2xl`}
            aria-label="Next Slide"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <FaArrowRight className="text-xl text-[#fff] group-hover:text-[#383F71]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
