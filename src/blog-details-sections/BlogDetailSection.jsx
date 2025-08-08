import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaComment,
  FaEye,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import CommentPost from "./CommentPost";
import CommentSection from "./CommentSection";
import ServicesDetails1 from "../assets/new/services-details1.jpg";
import VideoThumb from "../assets/new/salesteamimage.jpg";

const BlogDetailSection = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); 
  useEffect(() => {
  
    const fetchCourseDetails = async () => {
      const courseData = {
        id: courseId,
        title: "Retail Sales Planning and Forecasting",
        description:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered theLorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
        price: "$220",
        instructor: "Daniel Lee",
        instructorImage: "/src/assets/person7.png",
        starCategory: "4.8",
        lessons: 16,
        students: 350,
        image: "/src/assets/banner3.png",
        location: "online",
        topics: ["salesEnablement", "negotiation"],
        brochureLink: "/brochure.pdf",
      };

      const relatedCoursesData = [
        {
          id: 1,
          title: "Negotiation Skills",
          image: "/src/assets/course1.png",
        },
      ];

      setCourse(courseData);
      setRelatedCourses(relatedCoursesData);
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="w-3/4  py-3">
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-semibold text-gray-900 flex items-center">
            {course.title}
          </h2>
        </div>
      </div>

      <div className="md:w-1/3 md:ml-8 xl:w-full xl:ml-0 mt-6 md:mt-0 mb-6 relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="relative">
          <div className="absolute bottom-4 right-4 flex items-center">
            <div className="relative group">
              <button className="p-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-full flex items-center justify-center transition-all duration-300">
                <FaShareAlt size={30} className="text-white" />
              </button>
              <div className="absolute right-0 bottom-16 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out p-2 space-x-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={30} className="text-white text-xl" />
                  <hr className="mt-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={30} className="text-white text-xl" />
                  <hr className="mt-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={30} className="text-white text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="flex flex-wrap gap-4 ">
          <div className="flex items-center space-x-2">
            <FaEye className="text-[#DB0032]" />
            <span className="text-sm">1.5k</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaComment className="text-[#DB0032]" />
            <span className="text-sm">25</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-[#DB0032]" />
            <span className="text-sm">14th Jan 2015</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser className="text-[#DB0032]" />
            <span className="text-lg font-bold">By Admin</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-gray-700 mt-2 text-justify">{course.description}</p>
        <p className="mt-4 text-gray-600 leading-relaxed text-base">
          Dear Lorem Ipseum <br />
          Cc me on that pipeline, or innovation is hot right now...
        </p>
      </div>

      <div className="py-16 px-6">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Image Container */}
          <div className="flex-1 p-4 rounded-lg aspect-w-1 aspect-h-1">
            <img
              src={ServicesDetails1}
              alt="Sales Training"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Video Container */}
          <div className="flex-1 p-4 rounded-lg aspect-w-1 aspect-h-1 relative">
            {!isPlaying ? (
              <div
                className="w-full h-full bg-cover bg-center rounded-lg shadow-xl cursor-pointer flex items-center justify-center relative"
                style={{ backgroundImage: `url(${VideoThumb})` }}
                onClick={handlePlay}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
                <div className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-1.833A1 1 0 0010 10.25v3.5a1 1 0 001.555.832l3.197-1.833a1 1 0 000-1.664z"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full rounded-lg shadow-xl"
                src="https://www.youtube.com/embed/your-video-id?autoplay=1"
                title="Sales Force Evaluation Tool Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
      <div className=" py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl font-semibold mb-6">
            White Papers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Whitepaper 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                The ROI of Sales Enablement: How Investing in Training Drives
                Revenue Growth
              </h3>
              <p className="text-gray-700 mb-4">
                Explore a comprehensive analysis of how sales enablement
                initiatives positively impact sales performance and revenue
                generation.
              </p>
              <a
                href="#download"
                className="text-[#DB0032] hover:text-[#FA6602] font-semibold"
              >
                Download Now
              </a>
            </div>

            {/* Whitepaper 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Building a Scalable Sales Process: Best Practices for Growth
              </h3>
              <p className="text-gray-700 mb-4">
                This whitepaper outlines the essential steps for creating a
                scalable, repeatable sales process that drives consistent
                success.
              </p>
              <a
                href="#download"
                className="text-[#DB0032] hover:text-[#FA6602] font-semibold"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <CommentSection />
      <CommentPost />
    </section>
  );
};

export default BlogDetailSection;
