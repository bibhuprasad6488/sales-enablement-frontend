import React, { useEffect, useRef, useState } from "react";
import RightArrow from "../assets/arrow-right.png";
import Blog1 from "../assets/blog1.png";
import Blog2 from "../assets/blog2.png";
import Blog3 from "../assets/blog3.png";
import Blog4 from "../assets/blog-4.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBullhorn,
  FaComment,
  FaEye,
  FaTags,
  FaUser,
} from "react-icons/fa";

function LatestBlogs() {
  const [inView, setInView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 
  const elementRef = useRef(null);

  const blogs = [
    {
      id: 1,
      image: Blog1,
      title: "5 Key Habits of Highly Effective Sales Leaders",
      description:
        "Discover the habits that separate top sales leaders from the rest and learn how to cultivate them in your own leadership style.",
    },
    {
      id: 2,
      image: Blog2,
      title: "Top Sales Strategies for Startups",
      description:
        "Uncover the best practices for small businesses and startups to accelerate growth and secure customers in a competitive market.",
    },
    {
      id: 3,
      image: Blog3,
      title:
        "The Power of Sales Training: Why Continuous Learning is Essential",
      description:
        "Learn how investing in ongoing training can boost your team's effectiveness and lead to long-term success.",
    },
    {
      id: 4,
      image: Blog4,
      title: "Mastering Sales Conversations: How to Close More Deals",
      description:
        "Learn techniques to improve your sales conversations and close more deals, from the first interaction to sealing the deal.",
    },
    {
      id: 5,
      image: Blog3,
      title: "Effective CRM Strategies for Sales Growth",
      description:
        "Explore how leveraging customer relationship management tools can streamline your sales process and boost productivity.",
    },
    {
      id: 6,
      image: Blog2,
      title: "How to Build a Winning Sales Team",
      description:
        "Understand the essential traits to look for when building a successful sales team and how to nurture top performers.",
    },
    {
      id: 7,
      image: Blog1,
      title: "Sales Forecasting: Tips for Accurate Projections",
      description:
        "Learn strategies for accurate sales forecasting and how it can help you make data-driven decisions to grow your business.",
    },
    {
      id: 8,
      image: Blog4,
      title: "The Role of Emotional Intelligence in Sales",
      description:
        "Discover the importance of emotional intelligence in sales and how it can help you build better relationships with clients.",
    },
    {
      id: 9,
      image: Blog3,
      title: "Using Data to Improve Your Sales Performance",
      description:
        "Understand how to leverage sales data to make smarter decisions and improve overall sales performance.",
    },
  ];

  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="container mx-auto  case-study">
      <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col border-2"
            style={{
              borderImage: "linear-gradient(to right, #DB0032, #FA6602) 1",
              height: "100%", 
            }}
          >
            <div className="relative flex-1 flex flex-col">
         
              <div className="absolute flex gap-4 bottom-6 left-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white text-xs font-semibold py-1 px-3 rounded-tl-[8px] rounded-tr-[8px]">
                <div className="flex items-center">
                  <FaEye className="mr-1" />
                  <span>1.5k </span>
                </div>
                <div className="flex items-center mt-1">
                  <FaComment className="mr-1" />
                  <span>25 </span>
                </div>
              </div>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[233px] p-2 object-cover mb-4"
              />
              <div className="absolute bottom-6 right-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white text-xs font-semibold py-1 px-3 rounded-tl-[8px]">
                <p className="text-xl">14th</p> <p className="text-xl">Jan</p>
              </div>
            </div>

            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-md hover:bg-gradient-to-l transition-all duration-300">
                    <FaBullhorn className="mr-2" />
                    <p className="text-sm">Sales Strategy</p>
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-[#DB0032] mr-2" />
                <p className="font-semibold mr-2">By</p>
                <div className="flex items-center">
                  <p>Admin</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg sm:text-sm md:text-[17px] uppercase font-semibold mb-2 p-4 text-center flex-grow">
              {blog.title}
            </h3>
            <p className="text-left mb-4 text-sm px-6 sm:text-base flex-grow">
              {blog.description}
              <hr className="mt-4" />
            </p>

            <div className="flex justify-center flex-grow">
              <Link
                to={`/blog-details/${blog.id}`}
                className="relative w-[86%] icon-hover mb-4 px-6 py-3 flex items-center justify-center font-medium text-sm text-[#DB0032] border-2 border-transparent rounded-md transition-all duration-500 ease-out hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
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
          </div>
        ))}
      </motion.div>


      <div className="flex justify-end mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-l-md flex items-center justify-center"
        >
          <FaArrowLeft className="w-5 h-5" /> 
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md mx-1`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-r-md flex items-center justify-center"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default LatestBlogs;
