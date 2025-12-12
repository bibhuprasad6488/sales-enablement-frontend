import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
const RecruitmentServices = ({serviceDetails }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <section>
        <div className="relative w-full h-full  course-bg">
          <div className="relative   bg-layer">
            <Navbar />

            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16 ">
              <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold  ">
                Recruitment Services
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20 ">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Home", to: "/" },
                  { label: "Services", to: "/services" },
                  { label: "Recruitment Services" },
                ]}
              />
            </div>
          </div>
        </div>
      </section> */}
      <section className="w-full lg:w-3/4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            {serviceDetails?.title || "Recruitment Services"}
          </h2>
          <div className="mt-3 mx-auto h-1 w-32 bg-gradient-to-r from-red-500 to-pink-600 rounded"></div>
        </div>

        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
          <p className="text-lg md:text-xl leading-relaxed font-medium">
            The right people make all the difference. We don’t just train and
            coach sales teams — we also help you find and hire the right talent
            to fuel your growth.
          </p>
        </div>

        {/* Sales Coaching Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 mb-16">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            We recruit for roles including
          </h4>
          <ul className="space-y-3 text-gray-700">
            {[
              "Sales Development Representatives (SDRs)",
              "Account Executives (AEs)",
              "Sales Managers",
              "Sales Directors",
              "Chief Revenue Officers (CROs)",
              "Sales Enablement Specialists",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-white shadow-sm p-3 rounded-lg hover:shadow-md transition"
              >
                <CheckCircle className="text-red-500 w-5 h-5 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h4 className="text-xl font-bold text-gray-800 mt-10 mb-4">
            Our recruitment process includes:
          </h4>
          <ul className="space-y-3 text-gray-700">
            {[
              "Targeted sourcing of top sales talent",
              "Competency assessments (prospecting, closing, leadership, value selling)",
              "Onboarding alignment for faster productivity",
              "Executive hiring support (Sales Directors, CROs)",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-white shadow-sm p-3 rounded-lg hover:shadow-md transition"
              >
                <CheckCircle className="text-purple-500 w-5 h-5 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-gray-800 font-medium">
            With our recruitment services, you’re not just filling seats —
            you’re{" "}
            <strong>building a high-performance sales organization</strong>
            designed for long-term success.
          </p>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/contact-us")}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white font-semibold rounded-lg shadow hover:scale-105 transition"
            >
              Talk to Us Today
            </button>
          </div>
        </div>

        {/* Recruitment Services */}
      </section>
    </>
  );
};

export default RecruitmentServices;
