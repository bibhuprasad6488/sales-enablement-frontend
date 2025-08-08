import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {

  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import axios from "../api/axios"
import { Link } from "react-router-dom";

const RelatedCourseSlider = ({courseId, course}) => {
  console.log(courseId)
  if (!courseId) return <p></p>;
  const sliderRef = useRef(null);
  const [hoveredCourseId, setHoveredCourseId] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        const res = await axios.get(`/get-related-course/${courseId}`);
        console.log("API Response:", res.data.data); // Check if API itself returns duplicates
  
        // Ensure unique courses based on `id`
        const uniqueCourses = Array.from(
          new Map(res.data.data.map((course) => [course.id, course])).values()
        );
  
        setRelatedCourses(uniqueCourses);
      } catch (error) {
        console.error("Error fetching related courses:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRelatedCourses();
  }, [courseId]);
  




  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const goToPreviousSlide = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const goToNextSlide = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  return (
    <div className="relative w-full">
      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {relatedCourses.map((course) => {
          const charLimit = 100;
          const isExpanded = expandedDescription[course.id];
          const displayedDescription = isExpanded
            ? course.description
            : `${course.description.slice(0, charLimit)}${course.description.length > charLimit ? "..." : ""
            }`;

          return (
            <div
              key={course.id}
              className="flex flex-col justify-between cursor-pointer shadow-xl overflow-hidden relative transition-transform transform"
              onMouseEnter={() => setHoveredCourseId(course.id)}
              onMouseLeave={() => setHoveredCourseId(null)}
            >

<Link to={`/courses-details/${course.slug}`}>


              <div
                className={`border-2 px-4 py-4 flex flex-col justify-between shadow-xl overflow-hidden relative transition-all duration-300  ${hoveredCourseId === course.id
                    ? "border-transparent bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white"
                    : "border-gray-300 bg-white"
                  }`}
                style={{
                  minHeight: "260px",
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                  boxSizing: "border-box",
                  borderLeft: "6px solid transparent",
                  borderImageSource:
                    "linear-gradient(to bottom, #DB0032, #FA6602)",
                  borderImageSlice: 1,
                }}
              >
                <div className=" py-3">
                  {/* Course Icon and Title */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-semibold w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 ${hoveredCourseId === course.id
                            ? "bg-white text-[#DB0032]"
                            : "text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                          }`}
                      >
                         <span dangerouslySetInnerHTML={{ __html: course.icon }} />
                      </span>
                      <span className="font-semibold">
                      <span className="font-semibold">{course.name}</span>
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 rounded-md px-3 py-1 transition-all duration-300 ${hoveredCourseId === course.id
                          ? "bg-white text-red-600"
                          : "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white"
                        }`}
                    >
                  {course.course_type}
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-sm md:text-base lg:text-lg font-bold uppercase mb-4">
                 {course.name}
                  </h3>

                  {/* Horizontal Divider */}
                  <hr className="my-4 border-gray-300" />

                  {/* Course Description */}
                  <p className="text-sm font-light leading-relaxed">
                    {displayedDescription}
                    {course.description.length > charLimit && (
                      <button
                        className="text-blue-500 ml-2 hover:underline"
                        onClick={() => toggleDescription(course.id)}
                      >
                        {isExpanded ? "Show Less" : "Learn More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
              </Link>


            </div>
          );
        })}
      </Slider>

      {/* Navigation Buttons */}
      <div className="flex justify-end py-3">
        <div className="flex gap-3">
          <button
            onClick={goToPreviousSlide}
            className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 hover:scale-105 rounded-full  text-white shadow-lg transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-xl`}
            aria-label="Previous Slide"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <FaArrowLeft className="text-xl text-[#fff] group-hover:text-[#383F71]" />
          </button>

          <button
            onClick={goToNextSlide}
            className={` bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-4 hover:scale-105 rounded-full  text-white shadow-lg transition-opacity duration-300  hover:bg-gradient-to-r hover:from-[#FA6602] group hover:to-[#DB0032] hover:shadow-2xl`}
            aria-label="Next Slide"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <FaArrowRight className="text-xl text-[#fff] group-hover:text-[#383F71]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedCourseSlider;
