import React, { useEffect, useRef, useState } from "react";
import RightArrow from "../assets/arrow-right.png";
import Blog1 from "../assets/blog1.png";
import Blog2 from "../assets/blog2.png";
import Blog3 from "../assets/blog3.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import axios from "../api/axios";
function LatestBlogs() {
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  const [BlogpageData, setBlogpageData] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/blog-lists`);
        setBlogpageData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      {
        threshold: 0.2,
        once: true,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, [inView]);
  return (
    <section className="container mx-auto px-4 py-12 case-study">
      <div className="text-center md:text-left mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <h2 className="text-[18px] sm:text-[28px] md:text-[36px] font-bold">
            <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
              Blog
            </span>
          </h2>
          <Link
            to="blogs"
            type="button"
            className="text-[#000] transition-transform duration-500 ease-out transform flex  md:px-6 md:py-3 w-full sm:w-auto md:w-auto  uppercase gap-3 justify-between space-x-2 items-center font-bold text-xs sm:text-sm  px-4 py-2 hover:text-[#000]  border-[#000] border-btn2"
          >
            Discover Latest Blogs
            <img src={RightArrow} alt="arrow" className="w-6 h-6 ml-2" />
          </Link>
        </div>
        <p className="text-sm sm:text-lg text-left md:text-xl xl:w-[70%] md:w-full lg:w-full md:leading-[35px] leading-[35px] mt-4">
          Our blog features valuable tips, trends, and case studies to help you
          optimize your sales processes and drive success. Whether you're a
          Sales Leader, CEO, or entrepreneur, you'll find actionable advice to
          elevate your sales game.
        </p>
      </div>

      <motion.div
        ref={elementRef}
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 100,
        }}
        exit={{ opacity: 0, y: 100 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        {BlogpageData?.slice(0, 3).map((blog, index) => (
          <div
            key={index}
            className="border flex flex-col items-center justify-between"
            style={{
              borderImage: "linear-gradient(to right, #DB0032, #FA6602) 1",
            }}
          >
            <img
              loading="lazy"
              src={blog.thumbnail}
              alt={blog.title}
              className="w-[100%] h-[233px] p-2 object-cover mb-4"
            />
            <h3
              title={blog.title}
              className="text-lg sm:text-sm md:text-[17px] uppercase font-semibold mb-2 p-4 text-center"
            >
              {blog.title?.length > 43
                ? blog.title.substring(0, 43) + "..."
                : blog.title}
            </h3>
            <p className="text-left mb-4 text-sm px-6 sm:text-base">
              {blog.short_desc?.length > 150
                ? blog.short_desc.substring(0, 150) + "..."
                : blog.short_desc}
            </p>

            <Link
              to={`/blog-details/${blog.slug}`}
              type="button"
              className="relative w-[86%] text-xs sm:text-sm  icon-hover mb-4 px-6 py-3 flex items-center justify-center font-medium  text-[#DB0032] border-2 border-transparent rounded-md transition-all duration-500 ease-out hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
              style={{
                borderImage: "linear-gradient(to right, #DB0032, #FA6602) 1",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#DB0032] to-[#FA6602] opacity-0 hover:opacity-100 transition-opacity duration-500 ease-out"></span>
              <span className="relative z-10 flex items-center">
                LEARN MORE
                <FaArrowRight className="w-5 h-5 icon-hover2 ml-2 text-[#DB0032] transition-colors duration-500 ease-out hover:text-white" />
              </span>
            </Link>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default LatestBlogs;
