import React from "react";
import { motion } from "framer-motion";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import Background from "../assets/AchieveBg.webp";


const Achievement = ({ archivementData, error }) => {
  const iconMap = {
    "Global Recognition": <AiOutlineGlobal className="text-white text-2xl" />,
    "Industry Awards": <FaTrophy className="text-white text-2xl" />,
    "Empowering Sales Teams": <FiTrendingUp className="text-white text-2xl" />,
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
  };
  if (!archivementData) return <p></p>
    ;
  const achievementPointsArray = archivementData.achievement_points.split(",");
  return (
    <section className="relative py-12 overflow-hidden container mx-auto px-4">
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <motion.img
          src={Background}
          alt="Background"
          className="w-[60%] h-auto object-contain md:w-[50%] lg:w-[50%]"
          initial="hidden"
          animate="visible"
          variants={rightVariants}
          loading="lazy"
        />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-center z-10">
        <motion.div
          className="text-center md:text-left overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={leftVariants}
        >
          <h5 className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
            {archivementData.achievement_subtitle}
          </h5>

          <h2 className="text-[18px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7">
            <span
              className="about-intro-title"
              dangerouslySetInnerHTML={{
                __html: archivementData.archivement_title,
              }}
            />
          </h2>

          <p className="text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-[32px] text-justify mb-8">
            {archivementData.archivement_description}
          </p>
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-[#db0032] to-[#fa6602] text-white py-4 px-6 rounded text-center transition-all duration-300 hover:bg-gradient-to-l hover:text-gray-200 w-full sm:w-auto">
              <div className="flex flex-wrap justify-center items-center space-x-3 sm:space-x-4">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                  2.4K+
                </span>
                <span className="text-sm sm:text-base md:text-lg font-medium leading-tight text-center">
                  Successful <br className="hidden sm:block" /> Students
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center md:justify-end">
          <div className="flex flex-col justify-start space-y-4">
            {achievementPointsArray.map((point, index) => (
              <div
                key={index}
                className="flex items-center bg-[#fff] border  border-gray-200 p-4  rounded space-x-3 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-[#db0032]"
              >
                <div className="bg-gradient-to-r from-[#db0032] to-[#fa6602] p-2 rounded-full">
                  {iconMap[point] || (
                    <FiTrendingUp className="text-white text-2xl" />
                  )}
                </div>
                <span className="text-[#000] text-center font-medium">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
