import React from 'react'
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { FaRocket, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import salesGrowth from "../assets/growthSales.webp";
const MeasurableGrowth = ({missionData}) => {
  const navigate = useNavigate()
   
    const steps = [
      {
        title: "Tailored Training & Coaching",
        desc: "Every sales team is unique, which is why we design training programs specific to your challenges and opportunities. From mastering prospecting techniques to improving negotiation and closing skills, we ensure your team develops the capabilities needed to consistently win.",
      },
      {
        title: "Proven Sales Strategies",
        desc: "We don’t believe in one-size-fits-all. Instead, we help your leaders implement frameworks and playbooks that are practical, scalable, and designed for real-world results. With us, your team learns to sell smarter — not harder.",
      },
      {
        title: "Technology & Tools Alignment",
        desc: "The best sales organizations combine people with the right technology. We guide you in adopting and optimizing CRM systems, analytics dashboards, and enablement platforms so your team spends more time selling and less time stuck in admin.",
      },
      {
        title: "Performance Insights & Metrics",
        desc: "Sales success is measurable. We provide ongoing reporting, dashboards, and KPIs that give leaders visibility into performance — enabling quick course corrections and continuous improvement.",
      },
      {
        title: "CEO & Leadership Empowerment",
        desc: "Sales transformation doesn’t just happen at the frontline. We work directly with CEOs and sales leaders to build leadership confidence, sharpen decision-making, and ensure that your entire business strategy is aligned with sales execution.",
      },
    ];
     const points = [
       {
         title: "Strategic Partner",
         desc: "We don’t just train — we embed ourselves as part of your growth journey.",
       },
       {
         title: "Customized Approach",
         desc: "Tailored solutions for your team’s stage, size, and market.",
       },
       {
         title: "Scalable Systems",
         desc: "Playbooks, frameworks, and tools designed to grow with you.",
       },
       {
         title: "Lasting Impact",
         desc: "Measurable results that keep your team competitive long after the workshops end.",
       },
     ];
  return (
    <>
      <section>
        <div className="relative w-full h-full course-bg ">
          <div className="relative   bg-layer">
            <Navbar />

            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16 ">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold text-center ">
                Sales Enablement <br /> That Drives Measurable Growth
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Home", to: "/" },
                  { label: `Sales Enablement That Drives Measurable Growth` },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold leading-snug">
              Sales Enablement That Drives{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
                Measurable Growth
              </span>
            </h1>
            <p className="mt-6 text-gray-600 leading-relaxed">
              In today’s competitive markets, sales teams need more than just
              ambition to succeed — they need the right strategies, tools, and
              support to perform at their best. A great sales enablement agency
              bridges the gap between strategy and execution, ensuring your
              sales leaders and teams are fully equipped to thrive.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              At{" "}
              <span className="font-semibold">
                The Sales Enablement Company
              </span>
              , we partner with CEOs and sales leaders to design tailored
              programs that align your people, processes, and technology —
              unlocking peak performance and sustainable growth.
            </p>
            {/* <button className="mt-8 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] shadow-lg hover:opacity-90 transition">
              <FaRocket /> Grow Faster
            </button> */}
          </div>

          <div className="flex overflow-hidden justify-center md:justify-center">
            <motion.div
              className="relative overflow-hidden flex-1 h-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              style={{
                "@media (max-width: 768px)": {
                  variant: "mobile",
                },
              }}
            >
              <div className="flex justify-center align-middle">
                <div className="mission-bg">
                  <img
                    loading="lazy"
                    src={salesGrowth}
                    alt="About"
                    className="sm:w-[345px] w-[268px] h-[268px] relative right-2 top-2  sm:h-[355px]  mx-auto"
                    data-aos="fade-right"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Empower Section */}
        <section className="py-14 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center mb-12">
              How We Empower Your{" "}
              <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] bg-clip-text text-transparent">
                Sales Organization
              </span>
            </h2>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#DB0032] to-[#FA6602]" />

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[#DB0032] to-[#FA6602] border-4 border-white shadow-md" />

                    {/* Card */}
                    <div
                      className={`w-1/2 p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition ${
                        index % 2 === 0
                          ? "mr-auto text-right"
                          : "ml-auto text-left"
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] bg-clip-text text-transparent">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
          </div>
        </section>

        {/* Why Us Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Makes a Great{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DB0032] to-[#FA6602]">
              Sales Enablement Agency?
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {points.map((point, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#FA6602] mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Final CTA */}
        <section className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] py-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Sales Performance?
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            If you’re looking for a partner who understands the pressures of
            leadership and the realities of the sales floor, we’re here to help.
            Let’s work together to transform your sales team into a
            high-performing, revenue-driving engine.
          </p>
          <button
            onClick={() => navigate("/contact-us")}
            className="px-8 py-3 bg-white text-[#DB0032] rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Contact Us Today
          </button>
        </section>
      </div>
    </>
  );
}

export default MeasurableGrowth