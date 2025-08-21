import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { FaArrowTurnDown } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { ImPointRight } from "react-icons/im";
import { FcDownRight } from "react-icons/fc";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoArrowRedoOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { TbBoomFilled } from "react-icons/tb";
import { motion } from "framer-motion";
export default function DetailsPage() {
  const { slug } = useParams();
  console.log(slug);
  const [studyDetail, setstudyDetail] = useState([]);
  useEffect(() => {
    const test = async () => {
      const response = await axios.get(`/get-study-details/${slug}`);
      const result = await response.data;
      console.log("res", result);
      setstudyDetail(result);
    };
    test();
  }, []);
  console.log("hii", studyDetail);
 
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
  return (
    <>
      <section>
        <div className="relative w-full h-full course-bg ">
          <div className="relative   bg-layer">
            <Navbar />

            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16 ">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold ">
                Study Details
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Home", to: "/" },
                  { label: `${studyDetail?.title} ` },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="prose max-w-none mx-20 my-10">
        <div className="text-black"
          dangerouslySetInnerHTML={{
            __html: studyDetail?.description,
          }}
        />
      </section>

      {/* <div class="bg-white min-h-screen py-12 px-6 md:px-20">
        <motion.div
          class="text-baseline mb-12"
          id="study_detail_head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={topVariants}
        >
          <h2 class="text-xl md:text-2xl lg:text-4xl font-semibold ">
            Client Overview
          </h2>
          <p>{studyDetail?.client_overview}</p>
        </motion.div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="md:col-span-2 space-y-10">
            <motion.div
              id="second_part"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <h2 class="text-3xl font-semibold mb-4">
                Background: The Challenge
              </h2>
              <b>{studyDetail?.challeng_title_one}</b>
              <div className="item_coarse">
                {studyDetail?.challeng_keys?.map((data, index) => (
                  <span key={index} className="challenge-item">
                    <i className="challenge-icon">
                      <TbBoomFilled />
                    </i>
                    <span className="challenge-text">{data}</span>
                  </span>
                ))}
              </div>
              <p style={{ fontSize: "18px", paddingTop: "10px" }}>
                {studyDetail?.challeng_title_two}
              </p>
            </motion.div>

            <motion.div
              className="objective"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <h2 class="text-3xl font-semibold mb-4">Project Objectives</h2>
              <div>
                {studyDetail?.project_objectives?.map((data, i) => (
                  <span key={i}>
                    <i>
                      <ImPointRight />
                    </i>
                    <p>{data}</p>
                  </span>
                ))}
              </div>
            </motion.div>
            <section>
              <div class="relative border-l border-gray-200">
                <motion.div
                  class="mb-10 ml-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={leftVariants}
                >
                  <div class="absolute w-4 h-4 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full -left-2 border-2 border-white"></div>
                  <h3 class="text-2xl font-semibold">
                    Phase 1:{studyDetail?.p_one_title}
                  </h3>
                  <span class="text-sm text-gray-500">
                    {studyDetail?.p_one_duration}
                  </span>
                  <p class="mt-2 text-gray-700">
                    {studyDetail?.p_one_subtitle}
                  </p>
                  <div className="texts">
                    {studyDetail?.p_one_key_points?.map((data, index) => (
                      <span key={index}>
                        <i>
                          <FcDownRight />
                        </i>
                        <p>{data}</p>
                      </span>
                    ))}
                  </div>
                  <h2 style={{ fontSize: "15px", paddingTop: "10px" }}>
                    ✅ Outcome: {studyDetail?.p_one_outcome_title}
                  </h2>
                </motion.div>

                <motion.div
                  class="mb-10 ml-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={leftVariants}
                >
                  <div class="absolute w-4 h-4 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full -left-2 border-2 border-white"></div>
                  <h3 class="text-2xl font-semibold">
                    Phase 2: {studyDetail?.p_two_title}
                  </h3>
                  <span class="text-sm text-gray-500">
                    {studyDetail?.p_two_duration}
                  </span>
                  <p class="mt-2 text-gray-700">
                    {studyDetail?.p_two_subtitle}
                  </p>
                  <div className="texts">
                    {studyDetail?.p_two_key_points?.map((data, index) => (
                      <span key={index}>
                        <i>
                          <FcDownRight />
                        </i>
                        <p>{data}</p>
                      </span>
                    ))}
                  </div>
                  <p>{studyDetail?.p_two_subtitle_one}</p>
                  <h2 style={{ fontSize: "15px", paddingTop: "10px" }}>
                    ✅ Outcome: {studyDetail?.p_two_outcome_title}
                  </h2>
                </motion.div>

                <motion.div
                  class="mb-10 ml-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={leftVariants}
                >
                  <div class="absolute w-4 h-4 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full -left-2 border-2 border-white"></div>
                  <h3 class="text-2xl font-semibold">
                    Phase 3: {studyDetail?.p_three_title}
                  </h3>
                  <span class="text-sm text-gray-500">
                    {studyDetail?.p_three_duration}
                  </span>
                  <p class="mt-2 text-gray-700">
                    {studyDetail?.p_three_subtitle}
                  </p>
                  <div className="texts">
                    {studyDetail?.p_three_key_points?.map((data, index) => (
                      <span key={index}>
                        <i>
                          <FcDownRight />
                        </i>
                        <p>{data}</p>
                      </span>
                    ))}
                  </div>
                  <h2 style={{ fontSize: "15px", paddingTop: "10px" }}>
                    ✅ Outcome: {studyDetail?.p_three_outcome_title}
                  </h2>
                </motion.div>
              </div>
            </section>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <h2 class="text-2xl font-semibold mb-4">
                {studyDetail?.result_title}
              </h2>
              <p class="mt-2 mb-2 text-gray-700">
                {studyDetail?.result_subtitle}
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                {studyDetail?.result_points?.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
              <h2 class="text-3xl font-semibold mb-4">
                {studyDetail?.diff_title}
              </h2>
              <p>{studyDetail?.diff_subtitle}</p>
              {studyDetail?.diff_points?.map((data, i) => (
                <>
                  <div id="items">
                    <i style={{ display: "flex", placeSelf: "center" }}>
                      <IoArrowRedoOutline />
                    </i>
                    <p style={{ fontSize: "15px" }}>
                      <b> {data.title}</b> {data.subtitle}
                    </p>
                  </div>
                </>
              ))}
            </motion.div>
            <motion.div
              class="bg-gray-50 p-6 rounded-lg shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={topVariants}
            >
              <h2 class="text-3xl font-semibold mb-4">Conclusion</h2>
              <p class="italic text-gray-700">{studyDetail?.conclusion_desc}</p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightVariants}
            class="bg-white shadow-lg rounded-lg p-6 border "
            style={{
              display: "grid",
              justifySelf: "center",
              alignSelf: "baseline",
            }}
          >
            <h3 class="text-xl font-semibold mb-4 flex gap-1">
              <i style={{ display: "flex", placeSelf: "center" }}>
                <MdOutlineAccessTime />
              </i>
              Timeline Summery
            </h3>

            <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Start Date</p>
                <p class="font-semibold">{studyDetail?.start_date}</p>
              </div>
              <div>
                <p class="text-gray-500">End Date</p>
                <p class="font-semibold">{studyDetail?.end_date}</p>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-gray-500">Duration</p>
              <p class="text-red-500 font-bold">{studyDetail?.duration}</p>
            </div>
            <div class="mt-6 space-y-3">
              <button class="w-full py-2 rounded-md bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white font-semibold hover:opacity-90">
                Call Us
              </button>
            </div>
          </motion.div>
        </div>
      </div> */}
    </>
  );
}
