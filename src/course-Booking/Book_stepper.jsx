import { useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import BookCourse from "./BookCourse";
import { useLocation } from "react-router-dom";
import Spereadsheet_Book from "./Spereadsheet_Book";
import People_Invitation from "./People_Invitation";
import { ToastContainer } from "react-toastify";

export default function RedStepper() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Register as a delegate" },
    {
      id: 2,
      label: "Book on behalf of another individual / a group of people",
    },
    { id: 3, label: "Invite other people to register" },
  ];

  const location = useLocation();
  const courses = location.state?.course;
  const courseName = courses?.name || "";

  return (
    <>
      <section>
        <div className="relative w-full h-full course-bg">
          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:pt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
                Booking Courses
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Course", to: "/" },
                  { label: "Booking Courses", to: "/booking-course/general" },
                  // { label: "Legal" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course name */}
      <h1 className="text-center mt-6 sm:mt-10 text-2xl sm:text-4xl font-black uppercase">
        {courseName}
      </h1>

      <div className="w-full flex flex-col items-center p-2 sm:p-4">
        {/* Tabs */}
        <div className="w-full z-6 sm:w-[80%] pt-6 sm:pt-14 border-b border-gray-300 flex justify-start sm:justify-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
          flex-1 min-w-0 px-2 py-1 text-xs sm:px-6 sm:py-2 sm:text-sm md:text-base transition relative text-center
          ${
            isActive
              ? "font-bold z-999 text-[#ee3f14] scale-105 border-2 border-[#ee3f14] border-b-0 rounded-t bg-white"
              : "text-gray-500"
          }
        `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full md:w-[70%]  sm:p-0 bg-white mb-5  ">
          {activeTab === 1 && <BookCourse />}
          {activeTab === 2 && <Spereadsheet_Book />}
          {activeTab === 3 && <People_Invitation />}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
