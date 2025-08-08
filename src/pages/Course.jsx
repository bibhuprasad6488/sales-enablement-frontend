
import React, { useState } from "react";
import CourseList from "../course-section/CourseList";
import Sidebar from "../course-section/CourseSidebar";
import HeroCourse from "../course-section/HeroCourse";
import FilterMobile from "../course-section/FilterMobile";
import { useFilter } from "../context/FilterContextApi";

function Course() {
  const { topics, filteredCourses, loading, error, selectedTopics } = useFilter();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getFilteredDetails = () => {
    let details = selectedTopics.length ? selectedTopics.join(" | ") : "All Courses";
    return details;
  };

  return (
    <div>
      <HeroCourse />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-sm leading-2 sm:text-2xl lg:text-4xl font-bold uppercase sm:leading-[48px] mb-3 lg:mb-5">
          All{" "}
          <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
            the Sales Enablement Skills You
          </span>
          <br /> Need in One Place
        </h1>
        <hr className="py-2 lg:py-5" />
        <div className="flex justify-between items-center">
          <p className="text-sm">
            Showing: <span className="text-sm ml-4">{getFilteredDetails()}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row py-12 gap-10">
    
          <Sidebar topics={topics} />

          <CourseList courses={filteredCourses} loading={loading} error={error} />
        </div>
      </div>
      <FilterMobile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default Course;

