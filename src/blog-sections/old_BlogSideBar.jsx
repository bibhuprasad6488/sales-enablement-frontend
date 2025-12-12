import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Blog1 from "../assets/blog1.png";
import Blog2 from "../assets/blog2.png";
import Blog3 from "../assets/blog3.png";
import Blog4 from "../assets/blog-4.png";

const BlogSideBar = ({ setFilters }) => {
  const location = useLocation(); // to detect current page

  const [categories, setCategories] = useState({
    "Sales Strategies": false,
    "Sales Training": false,
    "Sales Tools & Technology": false,
    "Performance Analytics": false,
    "Sales Coaching": false,
    "Negotiation Skills": false,
    "Sales Leadership": false,
  });
  const [tags, setTags] = useState({
    "Sales Strategies": false,
    "Sales Training": false,
    "Sales Tools": false,
    Technology: false,
  });
  const [audience, setAudience] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("all");
  const [trends, setTrends] = useState({
    "Maximizing Sales Performance": false,
    "Sales Performance Trends": false,
    "Marketing Strategies": false,
  });
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Update filters in parent whenever searchTerm changes
  useEffect(() => {
    setFilters({
      categories,
      tags,
      audience,
      searchTerm,
      price,
      trends,
    });
  }, [searchTerm, categories, tags, audience, price, trends, setFilters]);

  const recentPosts = [
    {
      title: "Maximizing Sales Performance: The Ultimate Guide",
      date: "January 15, 2025",
      image: Blog2,
    },
    {
      title: "Sales Strategies for 2025",
      date: "January 10, 2025",
      image: Blog1,
    },
    {
      title: "Mastering Negotiation Skills",
      date: "January 5, 2025",
      image: Blog3,
    },
    {
      title: "Top Sales Tools in 2025",
      date: "December 30, 2024",
      image: Blog4,
    },
  ];

  return (
    <aside
      className={`w-full md:w-1/4 bg-white p-6 shadow-lg h-2/3 rounded-lg md:block ${
        isOpen ? "block" : "hidden"
      } md:flex`}
    >
      <button
        className="md:hidden absolute top-4 left-4 bg-primary text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Blog Filters
        </h2>

        {/* Search box */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Blogs
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#060b33] hover:ring-[#060b33]"
              placeholder="Search for blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        {/* Recent posts */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Recent Posts
          </h3>
          <ul className="space-y-2">
            {recentPosts.slice(0, 4).map((post, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-600"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <a href="#" className="hover:text-[#DB0032] block">
                    {post.title}
                  </a>
                  <span className="text-xs text-gray-400 block">
                    {post.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Only show Categories, Tags, Trends if we are on /blogs */}
        {location.pathname === "/blogs" && (
          <>
            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="space-y-2">
                {Object.keys(categories).map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={categories[category]}
                      onChange={() =>
                        setCategories((prev) => ({
                          ...prev,
                          [category]: !prev[category],
                        }))
                      }
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="space-x-2 flex gap-2 flex-wrap">
                {Object.keys(tags).map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setTags((prev) => ({
                        ...prev,
                        [tag]: !prev[tag],
                      }))
                    }
                    className={`text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out transform ${
                      tags[tag]
                        ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-lg scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white hover:scale-105"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Trends */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trends
              </label>
              <div className="space-x-2 gap-3 flex flex-wrap">
                {Object.keys(trends).map((trend) => (
                  <button
                    key={trend}
                    onClick={() =>
                      setTrends((prev) => ({
                        ...prev,
                        [trend]: !prev[trend],
                      }))
                    }
                    className={`text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out transform ${
                      trends[trend]
                        ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-lg scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white hover:scale-105"
                    }`}
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default BlogSideBar;
