import React from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Bars } from "react-loader-spinner"; 
import {
  FaCheckCircle,
  FaChevronLeft,
  FaFlask,
  FaChevronRight,
  FaChartLine,
  FaUsers,
  FaSeedling,
} from "react-icons/fa";
import { Oval } from "react-loader-spinner";
const WhoweAre = () => {
  const [whoweAre, setwhoweAre] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [path, setPath] = useState("");

  const [currentFact, setCurrentFact] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const test = async () => {
      try {
        const response = await axios.get("/who-we-are");
        const result = response.data;
        setwhoweAre(result);
      } catch (error) {
        console.error("Error fetching who-we-are:", error);
      } finally {
        setIsLoading(false);
      }
    };
    test();
  }, []);

  useEffect(() => {
    if (!whoweAre?.wwd_keys) return;
    const circles = containerRef.current.querySelectorAll(".circle");
    let pathStr = "";
    circles.forEach((circle, i) => {
      const rect = circle.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();

      const x = rect.left - parentRect.left + rect.width / 2;
      const y = rect.top - parentRect.top + rect.height / 2;

      if (i === 0) {
        pathStr += `M ${x} ${y} `;
      } else {
        const offsetX = i % 2 === 0 ? x + 40 : x - 40;
        pathStr += `Q ${offsetX} ${y - 40}, ${x} ${y} `;
      }
    });
    setPath(pathStr);
  }, [whoweAre?.wwd_keys]);

  const values = [
    {
      icon: <FaCheckCircle />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.5,
      },
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
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const topVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const funFacts = [
    " Sales reps supported by enablement tools and training close deals 49% more often than those without. That’s why sales enablement isn’t a luxury — it’s a growth engine.",
    " Did you know? Prospects are 30% more likely to say ‘yes’ when they’ve shared a laugh with the salesperson. Sales enablement isn’t just about process — it’s about people.",
    " 70% of salespeople say they feel underprepared before a sales conversation — enablement bridges that gap.",
    " Companies with dedicated sales enablement programs see 15% faster ramp-up times for new hires.",
    " Sales reps who use enablement tools achieve 49% higher win rates than those who don’t.",
  ];
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [paused, funFacts.length]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Oval
  //         height={60}
  //         width={60}
  //         color="#DB0032"
  //         secondaryColor="#FA6602"
  //         strokeWidth={4}
  //         strokeWidthSecondary={4}
  //         visible={true}
  //         ariaLabel="loading"
  //       />
  //     </div>
  //   );
  // }
  if (isLoading) {
      return (
        <div
          style={{
            background: "linear-gradient(to right, #DB0032, #FA6602)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="flex flex-wrap">
            <Bars height="80" width="80" color="#FFFFFF" ariaLabel="bars-loading" visible={true} />
          </div>
        </div>
      );
    }
  return (
    <>
      {/* Header Section */}
      <section>
        <div className="relative w-full h-full course-bg">
          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:pt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
                Who We Are
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Home", to: "/" },
                  { label: "Who We Are" },
                  // { label: `${studyDetail?.title} ` },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white text-gray-800">
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={leftVariants}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {whoweAre?.title_one}
            </h2>
            <p className="text-lg text-gray-600">{whoweAre?.desc_one}</p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
          >
            <p className="text-gray-700">{whoweAre?.desc_two}</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {whoweAre?.title_two}
            </h3>
          </motion.div>
        </section>

        {/* What We Do */}
        <section className="bg-gray-50 py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                What <br />{" "}
                <b className=" text-6xl " style={{ color: "#ef4113" }}>
                  We Do
                </b>
              </h2>
              <p className="mt-6 text-lg text-gray-700 max-w-md">
                {whoweAre?.wwd_subtitle}
              </p>
            </motion.div>

            <motion.div
              className="relative"
              ref={containerRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={rightVariants}
            >
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={path}
                  stroke="#FECACA"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              <div className="space-y-[15px] relative z-10">
                {whoweAre?.wwd_keys?.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="circle flex items-center justify-center w-9 h-9 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white font-bold rounded-full">
                      {index + 1}
                    </div>
                    <p
                      className="ml-[13px] text-gray-800 font-medium"
                      style={{ display: "flex", alignSelf: "center" }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 text-[#DB0032]">
              Our Mission
            </h3>
            <p>{whoweAre?.mission_text}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 text-[#FA6602]">
              Our Vision
            </h3>
            <p>{whoweAre?.vision_text}</p>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our Core Values
              <span className="block w-12 h-1 bg-gradient-to-r from-[#DB0032] to-[#FA6602] mx-auto mt-2"></span>
            </h2>
            <motion.div
              className="flex flex-wrap justify-center gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {whoweAre?.core_values?.map((value, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-6 w-full sm:w-[300px] hover:shadow-lg transition"
                >
                  <div className="text-white text-xl mb-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-1 rounded-lg">
                    <FaCheckCircle />
                  </div>
                  <h3 className="font-semibold text-xl">{value.title}</h3>
                  <p className="text-gray-600 mt-2">{value.key_note}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="relative bg-white py-6">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8 uppercase tracking-wide">
              Some Fun Facts
              <span className="block w-10 sm:w-16 h-1 bg-gradient-to-r from-[#DB0032] to-[#FA6602] mx-auto mt-2 sm:mt-3 rounded-full"></span>
            </h2>

            <div
              className="relative min-h-[120px] sm:min-h-[180px] flex items-center justify-center"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Left Arrow */}
              <button
                onClick={() =>
                  setCurrentFact((prev) =>
                    prev === 0 ? funFacts.length - 1 : prev - 1
                  )
                }
                className="absolute left-0 text-2xl sm:text-5xl font-bold text-[#DB0032] hover:text-[#FA6602] z-10"
              >
                <FaChevronLeft />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white 
                     px-3 sm:px-6 py-3 sm:py-8 rounded-2xl shadow-lg 
                     text-xs sm:text-lg font-medium max-w-[250px] sm:max-w-lg mx-auto cursor-pointer"
                >
                  {funFacts[currentFact]}
                </motion.div>
              </AnimatePresence>

              {/* Right Arrow */}
              <button
                onClick={() =>
                  setCurrentFact((prev) =>
                    prev === funFacts.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-0 text-2xl sm:text-5xl font-bold text-[#DB0032] hover:text-[#FA6602] z-10"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-3 sm:mt-6 space-x-2 sm:space-x-3">
              {funFacts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFact(index)}
                  className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                    index === currentFact
                      ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <motion.div
          className="bg-gradient-to-b from-white to-gray-50 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={topVariants}
        >
          <h2 className="text-center text-3xl font-bold mb-8">
            Is This You?
            <span className="block w-12 h-1 bg-gradient-to-r from-[#DB0032] to-[#FA6602] mx-auto mt-2"></span>
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whoweAre?.this_you_points?.map((text, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <span className="w-5 h-5 flex items-center justify-center text-green-500 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <p className="text-gray-700">{text}</p>
                </div>
              );
            })}
          </div>
          <p className="text-2xl text-black flex justify-self-center self-center p-4 mt-4">
            {whoweAre.title_three}
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default WhoweAre;
