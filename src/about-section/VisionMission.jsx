import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import RightArrow from "../assets/arrow-right.png";


const VisionMission = ({ missionData, visionData, valueData, error }) => {
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
  if (!missionData) return <p></p>;
  if (!visionData) return <p></p>;
  if (!valueData) return <p></p>;
  const valueKeyPointsArray = valueData.value_key_points.split(",");
  return (
    <>
      <section className=" py-6 overflow-hidden about-class container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-start">
          <motion.div
            className="text-center md:text-left overflow-hidden flex flex-col justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
          >
            <h5
              className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text mt-0 pt-0"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-offset="0"
            >
              {missionData.mission_title}
            </h5>
            <p
              className="text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-[32px] text-justify mt-2 mb-6"
              data-aos="fade-left"
            >
              {missionData.mission_description}
            </p>
            {/* <div className="flex flex-col sm:flex-wrap md:flex-wrap lg:flex-row xl:flex-nowrap 2xl:flex-nowrap justify-between gap-4">
              <Link
                to={missionData.btn_link}
                type="button"
                className="text-[#000] transition-transform duration-500 ease-out transform flex md:px-10 lg:px-10 xl:px-6 text-nowrap md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto uppercase gap-3 justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-between 2xl:justify-between space-x-2 items-center font-bold text-sm px-4 py-2 hover:text-[#000] border-[#000] border-btn2"
              >
                {missionData.btn_text}
                <img
                  src={RightArrow}
                  alt="Arrow"
                  className="w-[24px] h-[24px]"
                />
              </Link>
            </div> */}
          </motion.div>
          <div className="flex overflow-hidden justify-center md:justify-center">
            <motion.div
              className="relative overflow-hidden flex-1 h-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
              style={{
                "@media (max-width: 768px)": {
                  variant: "mobile",
                },
              }}
            >
              <div className="flex justify-center align-middle">
                <div className="mission-bg">
                  <img
                    src={missionData.mission_image}
                    alt="About"
                    className="sm:w-[345px] w-[268px] h-[268px] relative right-2 top-2  sm:h-[355px]  mx-auto"
                    data-aos="fade-right"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden about-class container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-start">
          <div className="flex justify-center md:justify-center">
            <motion.div
              className="relative overflow-hidden flex-1 h-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <div className="flex lg:justify-normal justify-center">
                <div className="vission-bg">
                  <img
                    src={visionData.vision_image_one}
                    alt=""
                    className="w-[143px] h-[151px] border-8  rounded-lg  relative top-0 right-0  z-20"
                  />

                  <div className="rounded-br-lg">
                    <img
                      src={visionData.vision_image_two}
                      alt=""
                      className="w-[252.44px] h-[315.09px]  left-20 rounded-br-[114.5px] border-4  shadow-lg z-10 relative bottom-12"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="text-center md:text-left overflow-hidden flex flex-col justify-center h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
            style={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <h5
              className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text mt-0 pt-0"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-offset="0"
            >
              {visionData.vision_title}
            </h5>
            <p
              className="text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-[32px] text-justify mt-2 mb-6"
              data-aos="fade-left"
            >
              {visionData.vision_description}
            </p>
            {/* <div className="flex flex-col sm:flex-wrap md:flex-wrap lg:flex-row xl:flex-nowrap 2xl:flex-nowrap justify-between gap-4">
              <Link
                to={visionData.btn_link}
                type="button"
                className="text-[#000] transition-transform duration-500 ease-out transform flex md:px-10 lg:px-10 xl:px-6 text-nowrap md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto uppercase gap-3 justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-between 2xl:justify-between space-x-2 items-center font-bold text-sm px-4 py-2 hover:text-[#000] border-[#000] border-btn2"
              >
                {visionData.btn_text}
                <img
                  src={RightArrow}
                  alt="Arrow"
                  className="w-[24px] h-[24px]"
                />
              </Link>
            </div> */}
          </motion.div>
        </div>
      </section>
      <section className=" overflow-hidden container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            className="text-center lg:text-left flex flex-col justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
          >
            <h5
              className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-offset="0"
            >
              {valueData.values_title}
            </h5>
            <p
              className="text-sm sm:text-[16px] leading-[32px] text-justify mt-2 mb-6"
              data-aos="fade-left"
            >
              {valueData.values_description}
            </p>
            {/* <div className="flex flex-col sm:flex-wrap md:flex-wrap lg:flex-row xl:flex-nowrap 2xl:flex-nowrap justify-between gap-4">
              <Link
                to={valueData.btn_link}
                type="button"
                className="text-[#000] transition-transform duration-500 ease-out transform flex md:px-10 lg:px-10 xl:px-6 text-nowrap md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto uppercase gap-3 justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-between 2xl:justify-between space-x-2 items-center font-bold text-sm px-4 py-2 hover:text-[#000] border-[#000] border-btn2"
              >
                {valueData.btn_text}
                <img
                  src={RightArrow}
                  alt="Arrow"
                  className="w-[24px] h-[24px]"
                />
              </Link>
            </div> */}
          </motion.div>
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={leftVariants}
          >
            <div className="flex justify-center lg:justify-end">
              <div className="relative">

                <img
                  src={valueData.image}
                  alt="Vision"
                  className="w-[90%] md:w-[80%] z-2"
                />
                <div className="flex flex-col justify-center px-4 text-white w-48 h-48 sm:w-60 sm:h-60 top-[-140px] sm:top-[-180px] lg:right-12 right-0 relative z-4 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-lg">
                  {valueKeyPointsArray.map((value, index) => (
                    <div key={index} className="flex items-center gap-3 sm:gap-5 mb-2 last:mb-0">
                      <span className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                        <FaCheck className="text-green-500" />
                      </span>
                      <p className="text-sm sm:text-base">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VisionMission;
