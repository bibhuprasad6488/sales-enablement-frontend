import RightArrow1 from "../assets/arrow-right1.webp";
import RightArrow from "../assets/arrow-right.webp";
import FilterImg from "../assets/filter.webp";
import { Link, useNavigate } from "react-router-dom";
import { useApi2 } from "../context/CourseContextApi";
import { useState } from "react";
import { useApi3 } from "../context/WebsiteDataContext";

function OurCourses() {
  const { websiteData, loading: websiteLoading } = useApi3();
  const { courseData } = useApi2();
  if (!courseData) return <p></p>;
  const courses = Array.isArray(courseData) ? courseData : [];
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/services");
  };
  return (
    <>
      <div className="courses">
        <section className=" container mx-auto p-4 z-10">
          <div className=" mx-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl uppercase md:text-2xl font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
                Our Courses
              </h2>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex gap-4 2xl:gap-12 text-white mb-6 overflow-x-auto md:overflow-visible scrollbar-hide">
                {Array.isArray(courseData) &&
                  courseData.slice(0, 6).map((course, index) => (
                    <Link
                      key={course.id || index}
                      to={`/courses-details/${course.slug}`}
                      className="min-w-[45%] sm:min-w-[200px] md:min-w-0"
                    >
                      <div className="card p-2 shadow-lg flex flex-col items-center">
                        <div className="w-[112.19px] h-[112.19px] rounded-full bg-aliceblue flex items-center justify-center mb-4">
                          <img
                            loading="lazy"
                            src={course.image}
                            alt={course.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <p className="text-center text-sm md:text-[12px] px-1 uppercase">
                          {course.name}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-wrap lg:flex-wrap xl:flex-row lg:m xl:mx-7  justify-between items-center gap-4">
              <a
                id="consultation"
                type="button"
                href={websiteData?.footer_btn_link}
                // onClick={handlenavigate}
                target="_blank"
                className="relative font-medium overflow-hidden group text-white transition-all duration-300 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none sm:text-sm text-xs md:text-[14px] lg:text-[14px] xl:text-[14px] px-5 py-2.5 w-full md:py-4 sm:w-[378px] lg:px-3 lg:py-3 xl:px-6 xl:py-3 md:w-[380px] xl:w-auto lg:w-[380px] flex items-center justify-center"
              >
                <span className="absolute inset-0 w-0 h-full   bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                <span className="relative text-white group-hover:text-white flex items-center">
                  {websiteData?.footer_btn}
                  <img
                    loading="lazy"
                    src={RightArrow1}
                    alt="Arrow Icon"
                    className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                  />
                </span>
              </a>
              <div className="relative">
                <div className="flex justify-between items-center border-2 border-black p-1">
                  <img
                    loading="lazy"
                    src={FilterImg}
                    alt="Filter Icon"
                    className="w-6 h-6 ml-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  />
                  <input
                    type="text"
                    placeholder="Search Courses"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setDropdownOpen(e.target.value.length > 0);
                    }}
                    className="flex-1 w-full px-6 py-2 sm:px-4 sm:py-1 font-bold placeholder:text-sm  outline-none"
                  />
                  {filteredCourses.length > 0 ? (
                    <Link
                      to={`/courses-details/${filteredCourses[0].slug || ""}`}
                      className="text-white group transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-[12px] sm:text-sm md:text-[14px] px-5 py-2.5 flex items-center justify-center relative"
                    >
                      <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-[#060b33]"></span>
                      <span className="relative text-white group-hover:text-white flex items-center">
                        Book Now
                      </span>
                    </Link>
                  ) : null}
                </div>
                {isDropdownOpen && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course, index) => (
                        <div
                          key={index}
                          className="p-2 text-center text-sm font-bold border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSearchQuery(course.name);
                            setDropdownOpen(false);
                          }}
                        >
                          {course.name}
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 font-bold p-2">
                        No courses found
                      </p>
                    )}
                  </div>
                )}
              </div>
              <Link
                to="courses"
                type="button"
                className="text-[#000] transition-transform duration-500 ease-out transform  flex md:px-6 md:py-2 lg:py-2.5 xl:py-2.5 2xl:py-2.5 sm:w-[378px] md:w-[385px] justify-center  w-full xl:w-auto lg:w-[385px]  uppercase gap-3 sm:justify-center md:justify-center xl:justify-between lg:justify-center  space-x-2 items-center font-bold text-xs sm:text-sm px-4 py-2 hover:text-[#000]  border-[#000] border-btn2"
              >
                Discover Our Courses
                <img
                  loading="lazy"
                  src={RightArrow}
                  alt="Right Arrow"
                  className="w-6 h-6"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default OurCourses;
