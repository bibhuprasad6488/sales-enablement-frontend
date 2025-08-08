import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGlobeAmericas,
} from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
const CourseItem = ({ course }) => {
  if (!course) return <p></p>;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleCourseClick = () => {
    if (course && course.id) {
      navigate(`/courses-details/${course.slug}`);
    }
  };
  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = course.description;
  const charLimit = 180;
  const shortDescription = description.slice(0, charLimit);
  const fullDescription = description;
  return (
    <div className="container">
      <div
        className="border-2 flex flex-col justify-between cursor-pointer shadow-xl overflow-hidden relative transition-transform transform"
        style={{
          borderLeft: "6px solid transparent",
          borderImageSource: "linear-gradient(to bottom, #DB0032, #FA6602)",
          borderImageSlice: 1,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCourseClick}
      >
        <div
          className={`px-6 py-4 flex flex-col justify-between transition-all duration-300 ${isHovered
              ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white"
              : ""
            }`}
          style={{
            minHeight: "260px",
            height: "auto",
            maxWidth: "100%",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div>

              <span
                className={`font-semibold w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 ${isHovered
                    ? "bg-white text-[#DB0032]"
                    : "text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                  }`}
                  dangerouslySetInnerHTML={{ __html: course.icon }} >
      
              </span>
              </div>
            
              <span className="font-normal">
                {course.category}
              </span>
            </div>
            <div
              className={`flex items-center justify-center gap-1 rounded-md px-2 py-2 transition-all duration-300 ${isHovered
                  ? "bg-white text-[#DB0032]"
                  : "text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                }`}
            >
              <div className="flex items-center gap-2">
              {course?.course_type}
                {course?.course_type === "Offline" ? (
                  <>
                    <BsBuildings  /> 
                  </>
                ) : course?.course_type === "Virtual" ? (
                  <>
                    <FaGlobeAmericas  />
                  </>
                ) : (
                  <span>Unknown Mode</span>
                )}
              </div>

            </div>
          </div>
          <h3 className="text-sm md:text-base lg:text-lg font-semibold uppercase mb-2">
            {course?.name}
          </h3>
          <hr className="my-2" />
          <p className="text-sm font-light mb-4">
            {showFullDescription ? fullDescription : shortDescription}
            {description.length > charLimit && (
              <button
                className="text-blue-500 ml-2"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
               ... {showFullDescription ? "" : "Learn More"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CourseItem;
