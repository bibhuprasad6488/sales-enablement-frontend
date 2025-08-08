
import React, { useState } from "react";
import ModuleContent from "../course-details-sections/ModuleContent";
import CourseObjectives from "../course-details-sections/CourseObjectives";
import MoreInfoContent from "../course-details-sections/MoreInfoContent";
import ContactDetails from "../course-details-sections/ContactDetails";

const TabNavigation = ({course}) => {
  const [activeTab, setActiveTab] = useState("modules");

  const tabButtonClass = (tab) =>
    `relative flex-grow text-center px-4 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 uppercase 
    text-xs sm:text-sm  font-semibold transition-all duration-300 ease-in-out group
    ${activeTab === tab ? "bg-[#383F71] text-white" : " bg-gradient-to-r from-[#DB0032] to-[#FF6A00] text-white"} 
    min-w-0`;

  return (
    <div className="py-4 w-full">
      <div className="flex flex-col lg:flex-row justify-center md:justify-between gap-2  lg:gap-10 mb-6">
        {[
          { label: "Modules", value: "modules" },
          { label: "Course Objectives", value: "objectives" },
          { label: "More Information", value: "moreInfo" },
          { label: "Contact Details", value: "contact" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={tabButtonClass(tab.value)}
          >
            <span className="absolute inset-0 w-0 h-full bg-[#383F71] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="sm:py-6 py-4 border-t-2 border-[#DB0032]">
        {activeTab === "modules" && <ModuleContent course={course} />}
        {activeTab === "objectives" && <CourseObjectives course={course} />}
        {activeTab === "moreInfo" && <MoreInfoContent course={course}  />}
        {activeTab === "contact" && <ContactDetails course={course}/>}
      </div>
    </div>
  );
};

export default TabNavigation;
