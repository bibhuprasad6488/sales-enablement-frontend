import React, { useEffect, useState } from "react";
import RightArrow1 from "../../assets/arrow-right1.png";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import HeroCandidate from "./sections/HeroCandidate";
import { Helmet } from "react-helmet-async";
import {
  FaCog,
  FaChartBar,
  FaCheckCircle,
  FaSlidersH,
  FaLightbulb,
} from "react-icons/fa";
import axios from "../../api/axios"
const CandidateAssessment = () => {
  const { slug } = useParams();
  const [data, setData] = useState({})
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/sales-candidate-details/${slug}`)
        setData(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        setError("failed to fetch data")
      }
    }
    fetchData();
  }, [slug])


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

  return (
    <>
      <Helmet>
        <title>{data.meta_title}</title>
        <meta name="description" content={data.meta_description} />
        <meta name="keywords" content={data.meta_keywords} />
        <meta property="og:title" content={data.og_title}/>
        <meta property="og:description" content={data.og_description} />
        <meta property="og:image" content={data.og_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <HeroCandidate salesCandidate={data} />

      <section className="py-12 about-class container overflow-hidden mx-auto px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-center">
          <motion.div
            className="relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={leftVariants}
          >
            <div className="w-full flex items-center justify-center">
              <img
                src={data.image}
                alt="Candidates Assessment"
                className="w-full max-w-[480px] h-1/3 sm:max-w-full object-contain"
              />  </div>
          </motion.div>

          <motion.div
            className="text-center md:text-left overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
          >
            <h5
              className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-offset="200"
            >
              {data.title}
            </h5>

            <h2
              className="text-[18px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-offset="200"
            >
              <span
                className="about-intro-title"
                dangerouslySetInnerHTML={{ __html: data.sub_title }}
              />
            </h2>

            <p
              className="text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-[32px] text-justify mb-8"
              data-aos="fade-left"
            >
              {data.description}
            </p>
          </motion.div>
        </div>
        <div className="py-12 px-6">
          <h2 className="text-lg  md:text-xl lg:text-2xl xl:text-3xl font-semibold text-center">
            {data.benifit_title}
          </h2>
          <p className="text-center  text-sm md:text-base lg:text-lg mt-2">
            {data.benefit_sub_title}

          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {Object.entries(data?.benefit_features || {}).map(([icon, feature], index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] shadow-md p-6 rounded-lg hover:scale-105 transform transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-white text-3xl">
                    <span dangerouslySetInnerHTML={{ __html: icon }}></span>
                  </div>
                  <h3 className="text-white text-sm xl:text-sm 2xl:text-lg font-bold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white text-sm xl:text-sm 2xl:text:sm font-light mt-2">{feature.key_note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 banner overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


            <motion.div
              className="relative overflow-hidden flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <img
                src={data.sca_image}
                alt={data.sca_title}
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl object-contain"
              />
            </motion.div>


            <motion.div
              className="text-center md:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={rightVariants}
            >
              <h5
                className="text-lg sm:text-xl md:text-2xl uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-offset="200"
              >
                {data.sca_sub_title}
              </h5>

              <h2
                className="text-lg sm:text-2xl md:text-3xl text-white font-bold uppercase mt-6 mb-6"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-offset="200"
              >
                <div className="text-white text-3xl">
                  <span dangerouslySetInnerHTML={{ __html: data.sca_title }}></span>
                </div>
              </h2>


              <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center justify-center lg:justify-start">
                <Link
                  to={data.sca_btn_link}
                  className="relative inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-semibold text-white uppercase transition-all duration-500 ease-in-out bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none"
                >
                  <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-white"></span>
                  <span className="relative flex items-center text-white group-hover:text-[#DB0032]">
                    {data.sca_btn_text}
                    <img
                      src={RightArrow1}
                      alt="Arrow Icon"
                      className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out"
                    />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-lg  md:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-6">
            {data.cau_title}
          </h2>
          <p className=" sm:font-normal text-center text-sm md:text-base lg:text-lg mb-12">
            {data.cau_sub_title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(data?.cau_features ?? {}).map(([icon, feature], index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] shadow-lg p-6 rounded-lg border-t-4 border-[#DB0032] hover:scale-105 transform transition-all duration-300"
              >

                <div className="text-4xl text-white mb-4">
                  <div className="text-white text-3xl">
                    <span dangerouslySetInnerHTML={{ __html: icon }}></span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-white text-sm xl:text-sm 2xl:text-sm font-light mt-2">
                  {feature.cau_note}
                </p>
              </div>
            ))}
          </div>


        </div>
      </section>
    </>
  );
};

export default CandidateAssessment;
