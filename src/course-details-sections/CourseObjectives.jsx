import React from 'react';
const CourseObjectives = ({course}) => {

  if (!course) return <p></p>
  return (
    <div className="bg-gradient-to-r from-[#FF6A00] to-[#DB0032] px-6 py-12 md:py-16 lg:py-20 flex justify-center">
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-extrabold text-white text-center mb-6 md:mb-8">
          Course Objectives
        </h2>

        <div className="bg-white px-6 py-8 md:px-10 md:py-12 rounded-lg shadow-2xl transform transition-all duration-300">
        <ul className="space-y-4 md:space-y-6">
        <div
                  className="text-left font-light text-sm md:text-base space-y-2 "
                  dangerouslySetInnerHTML={{ __html: course.course_objective }}
                />
          </ul> 
          {/* <div className="mt-8 flex justify-center">
              <button className="px-6 group md:px-8 uppercase py-3 md:py-4  bg-gradient-to-r from-[#DB0032] to-[#FF6A00] text-white text-sm md:text-lg font-semibold shadow-lg  transition-all duration-300 focus:outline-none relative overflow-hidden">
                <span className="absolute inset-0 w-0 h-full bg-[#383F71] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10">Enroll Now</span>
              </button>
         

          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CourseObjectives;
