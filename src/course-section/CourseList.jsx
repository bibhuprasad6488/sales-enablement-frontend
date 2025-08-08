import React from "react";
import { useFilter } from "../context/FilterContextApi";
import CourseItem from "./CourseItem";
const CourseList = () => {
  const { filteredCourses } = useFilter(); 
  return (
    <section className="flex-1">
      {filteredCourses.length === 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-6">
            We're sorry, but it looks like there are currently no courses
            matching your selected criteria. Please adjust your filters or check back later.
          </h2>
          <p>
            Need assistance? Contact us at{" "}
            <a
              href="mailto:info@theenablement.com"
              className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] bg-clip-text text-transparent"
            >
              info@theenablement.com
            </a>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};
export default CourseList;
