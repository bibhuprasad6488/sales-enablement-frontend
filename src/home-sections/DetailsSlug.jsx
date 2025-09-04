import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { ImPointRight } from "react-icons/im";
import { FcDownRight } from "react-icons/fc";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoArrowRedoOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, Link } from "react-router-dom";

import { FaLongArrowAltRight } from "react-icons/fa";

export default function DetailsPage() {
  const { slug } = useParams();
  const [studyDetail, setStudyDetail] = useState({});
  const [allStudies, setAllStudies] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(`/get-study-details/${slug}`);
      setStudyDetail(response.data);
    };
    fetchDetails();
  }, [slug]);

  useEffect(() => {
    const fetchAllStudies = async () => {
      try {
        const response = await axios.get("/get-case-study-data");
        setAllStudies(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllStudies();
  }, []);

  return (
    <>
      <section>
        <div className="relative w-full h-full course-bg">
          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
                Study Details
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Home", to: "/" },
                  { label: studyDetail?.title },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-10">
        <section className="prose max-w-none mx-10 my-10 flex-1 prose-p:m-0 prose-p:leading-normal prose-headings:leading-tight">
          <div
            className="text-black"
            dangerouslySetInnerHTML={{
              __html: studyDetail?.description,
            }}
          />
        </section>

        <aside className="w-full lg:w-1/3 p-6 mt-5">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 grid gap-1">
            <h2 className="text-2xl font-semibold mb-4">Other Studies</h2>

            {allStudies?.map((study, index) => (
              <Link key={index} to={`/studydetails/${study.slug}`}>
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer rounded-lg shadow-sm border transition-all duration-300 
      ${
        study.slug === slug
          ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-lg border-transparent"
          : "bg-white border-gray-200 text-black"
      }`}
                >
                  <span
                    className={`text-lg md:text-base transition-colors duration-300 ${
                      study.slug === slug ? "text-white" : "text-black"
                    }`}
                  >
                    {study.title} 
                  </span>
                  <FaLongArrowAltRight
                    className={`transition-colors duration-300 ${
                      study.slug === slug ? "text-white" : "text-[#ef4312]"
                    }`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
