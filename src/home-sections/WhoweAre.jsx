import React from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaFlask,
  FaChartLine,
  FaUsers,
  FaSeedling,
} from "react-icons/fa";

const WhoweAre = () => {
  const containerRef = useRef(null);
  const [path, setPath] = useState("");
  const services = [
    "Sales Development Representative (SDR) Department Setup",
    "Sales Playbook Development",
    "Sales Coaching & Training",
    "Prospecting & Pipeline Generation",
    "Sales Force Evaluations (powered by Objective Management Group)",
    "Sales Leader Enablement",
    "Partner Sourcing & Sales Process Optimization",
  ];

  useEffect(() => {
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
  }, [services]);

  const values = [
    {
      icon: <FaCheckCircle />,
      title: "Enablement First",
      text: "We build capability, not just run workshops.",
    },
    {
      icon: <FaFlask />,
      title: "Science + Heart",
      text: "We combine data-driven insights with human behavior.",
    },
    {
      icon: <FaChartLine />,
      title: "Accountability",
      text: "We deliver results, not just activity.",
    },
    {
      icon: <FaUsers />,
      title: "Partnership",
      text: "We work with you, not just for you.",
    },
    {
      icon: <FaSeedling />,
      title: "Growth Mindset",
      text: "We believe in continuous learning and evolution.",
    },
  ];

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
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white text-gray-800">
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Help Sales Teams Close More Deals
            </h2>
            <p className="text-lg text-gray-600">
              We partner with your sales team to remove the roadblocks that stop
              deals from closing and help create consistent growth.
            </p>
          </div>

          <div className="space-y-6">
            {[
              "You're tired of salespeople making excuses instead of closing deals",
              "Your team struggles to reach decision-makers",
              "You're not generating consistent qualified opportunities",
              "You want salespeople to own the number and perform predictably",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="green"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do */}
        <section className="bg-gray-50 py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                What <br />{" "}
                <b className=" text-6xl " style={{ color: "#ef4113" }}>
                  We Do
                </b>
              </h2>
              <p className="mt-6 text-lg text-gray-700 max-w-md">
                We deliver tailored, scientific, and high-impact sales
                enablement solutions including:
              </p>
            </div>

            <div className="relative" ref={containerRef}>
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
                {services.map((item, index) => (
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
            </div>
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
            <p>
              To equip African sales teams with the tools, systems, skills, and
              mindset needed to drive consistent performance in a modern,
              complex selling environment.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 text-[#FA6602]">
              Our Vision
            </h3>
            <p>
              To be Africa’s most trusted sales enablement partner, transforming
              salespeople into confident, capable, and quota-crushing
              professionals — one team at a time.
            </p>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our Core Values
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-6 w-full sm:w-[300px] hover:shadow-lg transition"
                >
                  <div className="text-red-500 text-4xl mb-3">{value.icon}</div>
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                  <p className="text-gray-600 mt-2">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Is This You? */}
        <div className="bg-gradient-to-b from-white to-gray-50 py-10">
          <h2 className="text-center text-3xl font-bold mb-8">
            Is This You?
            <span className="block w-12 h-1 bg-gradient-to-r from-[#DB0032] to-[#FA6602] mx-auto mt-2"></span>
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "You’re tired of salespeople making excuses instead of closing deals",
              "Your team struggles to reach decision-makers",
              "You're not generating consistent qualified opportunities",
              "You want salespeople to own the number and perform predictably",
            ].map((text, index) => {
              const highlightWords = [
                "salespeople making excuses instead of closing deals",
                "decision-makers",
                "consistent qualified opportunities",
                "own the number",
              ];
              let highlightedText = text;
              highlightWords.forEach((word) => {
                const regex = new RegExp(`(${word})`, "gi");
                highlightedText = highlightedText.replace(
                  regex,
                  '<span class="bg-yellow-200 font-semibold">$1</span>'
                );
              });
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
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  />
                </div>
              );
            })}
          </div>
          <p className="text-lg text-gray-600 flex justify-self-center self-center p-4">
            Then it’s time for enablement, not just motivation
          </p>
        </div>
      </div>
    </>
  );
};

export default WhoweAre;
