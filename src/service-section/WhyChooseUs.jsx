import React from "react";
import RightArrow1 from "../assets/arrow-right1.png";
import Person2 from "../assets/person2.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tick from "../assets/Tick.png";
import Students from "../assets/new/students.png";
import SalesLeaders from "../assets/new/sales-leaders.png";
import { FaCheck } from "react-icons/fa";
const WhyChooseUs = () => {
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
    <section className="py-12 about-class overflow-hidden container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center md:justify-start">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={leftVariants}
          >
            <div className="flex justify-center items-center ">
              <div className="services-bg relative">
                <img
                  src={Students}
                  alt=""
                  className="w-[150.38px] h-[150.38px] sm:w-[212px] sm:h-[205px] md:w-[234.3px] md:h-[240px]  lg:w-[200px] lg:h-[220px] xl:w-[270px] xl:h-[250px] 2xl:w-[290px] 2xl:h-[262px] absolute sm:top-[-5rem] top-[-2rem] right-16 md:top-[-5rem] lg:top-[-4rem] xl:top-[-6rem]  2xl:top-[-6rem] sm:right-0 md:right-0 lg:right-0 xl:right-6 2xl:right-0 z-20"
                />
                <img
                  src={SalesLeaders}
                  alt=""
                  className="w-[290px] h-[320px] sm:w-[290px] sm:h-[294px] md:w-[360px] md:h-[420px] lg:w-[336px] lg:h-[402px] xl:w-[424px] xl:h-[480px] 2xl:w-[424px] 2xl:h-[480px] z-10 rounded-lg relative left-[6rem] top-20 sm:left-20 md:left-36 lg:left-20 xl:left-20 2xl:left-20"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center md:text-left overflow-hidden"
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
          <h5
            className="text-[16px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            Who We Do
          </h5>

          <h2
            className="text-[18px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            Empowering Your Business with{" "}
            <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
              Exceptional Solutions <br />
            </span>
          </h2>

          <p
            className=" text-sm sm:text-[16px] md:text-[16px] lg:text-lg  leading-[32px] text-justify mb-8"
            data-aos="fade-left"
          >
            We pride ourselves on providing comprehensive solutions to optimize
            your sales processes, recruit the best talent, and ensure your sales
            teams are equipped to perform at their best. Our approach is
            tailored, data-driven, and built on years of experience in the
            industry.
          </p>

          <div className="space-y-4">
            {[
              {
                img: Tick,
                title: "Leadership Coaching",
                text: "Enhance executive skills for better decision-making and team guidance.",
              },
              {
                img: Tick,
                title: "CRM Training",
                text: "Master CRM tools to improve customer relationships and sales efficiency.",
              },
              {
                img: Tick,
                title: "Team Coaching",
                text: "Boost team performance and motivation to achieve sales goals.",
              },
            ].map((item, index) => (
              <div className="flex items-start space-x-4" key={index}>
                <div className=" flex justify-center ">
                  <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white w-4 h-4" />
                  </span>
                </div>

                <div className="flex items-start w-full gap-6">
                  <div className="w-2/5">
                    <h5 className="font-bold text-[12px]   lg:text-[14px]  uppercase mt-3  sm:mt-4 md:mt-5 lg:mt-1 xl:mt-1">
                      {item.title}
                    </h5>
                  </div>
                  <div className="w-full">
                    <p className="text-[12px] sm:text-[16px]  mt-3 sm:mt-4 md:mt-5 lg:mt-1 xl:mt-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-wrap md:flex-wrap   lg:flex-row xl:flex-nowrap 2xl:flex-nowrap  gap-12 mt-8">
            <Link
              to="/courses"
              type="button"
              className="text-white group text-nowrap text-xs md:text-sm  transition-transform duration-500 ease-out transform  uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none   md:text-[13px] px-5 py-2.5 w-full md:px-6 md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto
           flex items-center justify-center"
            >
              <span className="absolute inset-0 w-0 h-full   bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
              <span className="relative text-white group-hover:text-white flex items-center">
                Explore Our Courses
                <img
                  src={RightArrow1}
                  alt="Arrow Icon"
                  className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                />
              </span>
            </Link>

            <div className="flex items-center">
              <img
                src={Person2}
                alt="Sales Trainer"
                className="w-16 h-16 mr-4 rounded-full object-cover"
              />

              <div>
                <p className="text-xl uppercase font-bold text-black">Sales</p>
                <p className="text-sm uppercase font-bold text-gray-500 mt-2">
                  Sales Trainer & Coach
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
