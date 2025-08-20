import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "../api/axios";
import { motion } from "framer-motion";

function LatestBlogs({ filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 posts per page
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

  // Filter blogs by search
  const filteredBlogs = BlogpageData.filter((item) =>
    item.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination buttons (show max 3 at a time)
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + maxButtons - 1);

    // adjust start if end is at last page
    start = Math.max(1, end - maxButtons + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <section className="container mx-auto case-study">
      {filteredBlogs.length === 0 ? (
        <h1 className="text-3xl font-bold text-center py-10 text-black">
          We are sorry! No Blog content found.
        </h1>
      ) : (
        <>
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
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-[233px] p-2 object-cover mb-4"
                  />
                  <div className="absolute bottom-6 right-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white text-xs font-semibold py-1 px-3 rounded-tl-[8px]">
                    <p className="text-base">{blog.created}</p>
                  </div>
                </div>

                <h3 className="text-lg sm:text-sm md:text-[17px] uppercase font-semibold mb-2 p-4 text-center flex-grow">
                  {blog.title}
                </h3>
                <p className="text-left mb-4 text-sm px-6 sm:text-base flex-grow">
                  {blog.short_desc}
                  <hr className="mt-4" />
                </p>

                <div className="flex justify-center flex-grow">
                  <Link
                    to={`/blog-details/${blog.slug}`}
                    className="relative w-[86%] icon-hover mb-4 px-6 py-3 flex items-center justify-center font-medium text-sm text-[#DB0032] border-2 border-transparent rounded-md transition-all duration-500 ease-out hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #DB0032, #FA6602) 1",
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#DB0032] to-[#FA6602] opacity-0 hover:opacity-100 transition-opacity duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center">
                      LEARN MORE
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-end mt-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-l-md flex items-center justify-center"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 flex justify-center items-center mx-1 rounded-md ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-r-md flex items-center justify-center"
            >
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default LatestBlogs;
