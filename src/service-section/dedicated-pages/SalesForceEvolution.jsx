import React, { useEffect, useState } from "react";
import BenefitsSection from "./sections/BenefitsSection";
import HeroSFE from "./sections/HeroSFE";
import RightArrow1 from "../../assets/arrow-right1.webp";
import RightArrow from "../../assets/arrow-right.webp";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import axios from "../../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaPhoneAlt,
  FaComment,
  FaLongArrowAltDown,
} from "react-icons/fa";
import SalesAssessmentModal from "./sections/SalesAssessmentModal";
import { Helmet } from "react-helmet-async";

const SalesForceEvaluation = () => {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    mobile: {
      opacity: 0.5,
      x: "-50%",
    },
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/sales-force-details/${slug}`);
        setData(res.data?.data);
      } catch (error) {
        setError("failed to fetch data");
      }
    };
    fetchData();
  }, [slug]);
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v\/))([\w-]+)/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : "";
  };

  const getYouTubeThumbnail = (url) => {
    if (!url) return "default-thumbnail.webp";
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v\/))([\w-]+)/
    );
    return videoIdMatch
      ? `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`
      : "default-thumbnail.webp";
  };
  const videoUrl = data?.tool_video_link;
  const VideoThumb = getYouTubeThumbnail(data?.tool_video_link);

  return (
    <div>
      <Helmet>
        <title>{data?.meta_title}</title>
        <meta name="description" content={data?.meta_description} />
        <meta name="keywords" content={data?.meta_keywords} />
        <meta property="og:title" content={data?.og_title} />
        <meta property="og:description" content={data?.og_description} />
        <meta property="og:image" content={data?.og_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <HeroSFE salesForceEvaluation={data} />

      <section className="py-0 xl:py-12 about-class container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
          >
            <h2
              className="text-[20px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-offset="200"
            >
              <span
                className="about-intro-title"
                dangerouslySetInnerHTML={{ __html: data?.sub_title }}
              />
            </h2>

            <p
              className="text-sm md:text-[16px] leading-[32px] text-justify mb-8"
              data-aos="fade-left"
            >
              {data?.description}
            </p>

            <div className="flex flex-col sm:flex-wrap md:flex-wrap lg:flex-row xl:flex-nowrap 2xl:flex-nowrap justify-between gap-4 mt-8">
              <Link
                to={data?.btn_one_link}
                type="button"
                className="text-white group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5 w-full md:px-6 md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto flex items-center justify-center"
              >
                <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                <span className="relative text-white group-hover:text-white flex items-center">
                  {data?.btn_one_text}
                  <img
                    loading="lazy"
                    src={RightArrow1}
                    alt="Arrow Icon"
                    className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                  />
                </span>
              </Link>

              <Link
                to={data?.btn_two_link}
                type="button"
                className="text-[#000] transition-transform duration-500 ease-out transform flex md:px-10 lg:px-10 xl:px-6 text-nowrap md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto uppercase gap-3 justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-between 2xl:justify-between space-x-2 items-center font-bold text-sm px-4 py-2 hover:text-[#000] border-[#000] border-btn2"
              >
                {data?.btn_two_text}
                <img
                  loading="lazy"
                  src={RightArrow}
                  alt="Arrow"
                  className="w-[24px] h-[24px]"
                />
              </Link>
            </div>
          </motion.div>
          <div className="flex justify-center">
            <motion.div
              className="relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <img
                loading="lazy"
                src={data?.image}
                alt={data?.title}
                className="w-full max-w-md lg:max-w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-12 ">
        <BenefitsSection salesForceEvaluation={data} />
      </div>
      <section className="container mx-auto px-4">
        <h2 className="text-[20px]  md:text-xl lg:text-2xl xl:text-3xl font-semibold text-center mb-8 text-gray-800">
          {data?.tool_work_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left px-6">
            <p className="text-lg  mb-4">{data?.tool_work_description}</p>

            <div className="flex flex-col sm:flex-wrap md:flex-wrap lg:flex-row xl:flex-nowrap 2xl:flex-nowrap justify-between gap-4 mt-8">
              <a
                href={data?.tool_btn_two_link}
                target="_blank"
                className="text-white group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5 w-full md:px-6 md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto flex items-center justify-center"
              >
                <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                <span className="relative text-white group-hover:text-white flex items-center">
                  {data?.tool_btn_two_text}
                  <img
                    loading="lazy"
                    src={RightArrow1}
                    alt="Arrow Icon"
                    className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                  />
                </span>
              </a>
              {/* {isModalOpen && (
                <SalesAssessmentModal toggleModal={toggleModal} />
              )} */}
            </div>
          </div>
          <div className="flex justify-end px-4 mb-6">
            <div className="w-full max-w-[600px] h-[400px] md:h-[600px] relative">
              {!isPlaying ? (
                <div
                  className="w-full h-full bg-cover bg-center rounded-lg shadow-xl cursor-pointer flex items-center justify-center relative"
                  style={{
                    backgroundImage: `url(${VideoThumb})`,
                  }}
                  onClick={handlePlay}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>

                  <div className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-1.833A1 1 0 0010 10.25v3.5a1 1 0 001.555.832l3.197-1.833a1 1 0 000-1.664z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <video
                  src={videoUrl}
                  loading="lazy"
                  controls
                  autoPlay={isPlaying} // conditional autoplay
                  className="w-full h-full rounded-lg shadow-xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesForceEvaluation;
