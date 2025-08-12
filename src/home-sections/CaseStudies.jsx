import React from "react";
import CaseRightArrow from "../assets/caser-arrow-right.png";
import SampleLogo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function CaseStudies() {
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  const [caseStudiesData, setcaseStudiesData] = useState([]);

  useEffect(() => {
    const caseData = async () => {
      const response = await axios.get("/get-case-study-data");
      const result = await response.data;
      console.log(result);
      setcaseStudiesData(result);
    };
    caseData();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, [inView]);
  const navigate = useNavigate();
  return (
    <section className="case-study py-12 container mx-auto px-4">
      <div className="text-center md:text-left mb-auto">
        <div className="w-full mb-8">
          <h5 className="text-[16px] sm:text-[24px] md:text-[24px] font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
            Our Case Studies
          </h5>

          <h2 className="text-[18px] md:text-[36px] sm:text-[28px] font-bold mt-2 mb-2 sm:mt-4 sm:mb-4 md:mt-7 md:mb-7 lg:mt-7 lg:mb-7 xl:mt-7 xl:mb-7 2xl:mt-7 2xl:mb-7 w-full lg:w-full xl:w-[700px]">
            Driving Success with Proven <br />
            <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
              Strategies
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:w-full lg:w-full xl:w-[70%] md:leading-[32px] leading-[24px] mt-5 sm:mt-8 md:mt-12 lg:mt-12 xl:mt-12 2xl:mt-12  md:px-0 text-justify">
            We take pride in delivering measurable results for our clients. Our
            case studies highlight how our tailored solutions have helped sales
            teams achieve exceptional performance. Explore these success stories
            to see how we drive real change for organizations like yours.
          </p>
        </div>

        <motion.div
          ref={elementRef}
          className="grid grid-cols-1 bg-cont sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:px-0"
          initial={{ opacity: 0, y: 100 }}
          viewport={{ once: true, amount: 0.5 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 100,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          {caseStudiesData.map((caseStudy, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${caseStudy.image})`,
                backgroundSize: "100% 100%",
              }}
              className={`group cursor-pointer case1 flex justify-center items-end w-full h-[350px] `}
            >
              <div
                className="bg-white w-full sm:w-[426.59px] h-[140px] p-4 transition-all transform group-hover:scale-105 group-hover:h-[220px] duration-300 ease-in-out"
                id="bg"
                onClick={() => navigate(`/studydetails/${caseStudy.slug}`)}
              >
                <div className="flex justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
                    Case study
                  </h3>
                  <img
                    src={SampleLogo}
                    alt="Company Logo"
                    className="w-10 h-10"
                  />
                </div>
                <p className=" uppercase font-bold mt-2 text-sm sm:text-base">
                  {caseStudy.title}
                </p>
                <div className="flex items-end justify-end">
                  <img
                    src={CaseRightArrow}
                    alt="Case Right Arrow"
                    className="mt-2 w-[24px] h-[24px]"
                  />
                </div>
                <p className="absolute opacity-0 group-hover:opacity-100  mt-2 transition-opacity duration-300 ease-in-out text-sm sm:text-base bottom-[20px] left-[20px] right-[20px]">
                  {caseStudy.short_desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseStudies;
