import React from "react";
import Awards from "../assets/Awards.png";
import { motion } from "framer-motion";


const AwardSection = ({awardData, error}) => {
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
  if (!awardData) return <p></p>;
  return (
    <section className="py-6 about-class overflow-hidden container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-start h-full">
        <motion.div
          className="text-center md:text-left overflow-hidden flex flex-col justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={leftVariants}
        >
          <h5
            className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text mt-0 pt-0"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-offset="0"
          >
            {awardData.award_title}
          </h5>
          <p
            className="text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-[32px] text-justify mt-2 mb-6"
            data-aos="fade-left"
          >
            {awardData.award_description}
          </p>
        </motion.div>
        <div className="flex justify-center md:justify-center">
          <motion.div
            className="relative overflow-hidden flex-1 h-full flex items-start justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
            style={{
              "@media (max-width: 768px)": {
                variant: "mobile",
              },
            }}
          >
            <img
              src={awardData.image}
              loading="lazy"
              alt="About"
              className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-auto max-h-[40vh] sm:max-h-[300px] object-contain mx-auto"
              data-aos="fade-right"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardSection;
