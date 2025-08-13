import React, { useEffect, useState } from "react";
import CourseDetailSection from "../course-details-sections/CourseDetailSection";
import HeroCourseDetails from "../course-details-sections/HeroCourseDetails";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
function CourseDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`get-course-details/${slug}`);
        const data = res.data.data;
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return (
    <div>
      <HeroCourseDetails titleData={course} />

      <div className="container mx-auto px-4 py-12 ">
        <CourseDetailSection courseData={course} />
      </div>
    </div>
  );
}

export default CourseDetails;
