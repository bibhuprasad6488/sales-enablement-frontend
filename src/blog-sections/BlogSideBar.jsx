import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import Blog1 from "../assets/blog1.png";
import Blog2 from "../assets/blog2.png";
import Blog3 from "../assets/blog3.png";
import Blog4 from "../assets/blog-4.png";
import axios from "../api/axios";
const BlogSideBar = ({ setFilters }) => {

  const {slug} = useParams()
  console.log("slug is ",slug);
  
  const location = useLocation();

  const [audience, setAudience] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("all");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilters({
      searchTerm,
    });
  }, [searchTerm, setFilters]);
  const [recentpost, setrecentpost] = useState([]);
  const [category, setcategory] = useState([]);
  const [tag, settag] = useState([]);
  const [trends, settrends] = useState([]);
  useEffect(() => {
    const SidebarData = async () => {
      const response = await axios.get("/blog-filters");
      const result = await response.data;
      setrecentpost(result.recent_post);
      setcategory(result.categories);
      settag(result.tags);
      settrends(result.trends);
    };
    SidebarData();
  }, []);

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

        {/* Recent posts */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Recent Posts
          </h3>
          <ul className="space-y-2">
            {recentpost
              ?.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((post, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <Link
                      to={`/blog-details/${post.slug}`}
                      className={`hover:text-[#DB0032] block ${
                        slug === post.slug
                          ? "text-[#ee3e15] font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {post.title?.length > 30
                        ? post.title.substring(0, 30) + "..."
                        : post.title}
                      <span className="text-xs text-gray-400 block">
                        {post.created}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {location.pathname === "/blogs" && (
          <>
            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="space-y-2">
                {category.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" id={index} className="mr-2" />
                    <label className="text-sm text-gray-700" htmlFor={index}>
                      {category.title}
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
                {tag.map((tag, i) => (
                  <button
                    key={i}
                    className={`text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out transform ${
                      tag[tag]
                        ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-lg scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white hover:scale-105"
                    }`}
                  >
                    {tag.title}
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
                {trends.map((trend, i) => (
                  <button
                    key={i}
                    className={`text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out transform ${
                      trends[trend]
                        ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white shadow-lg scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white hover:scale-105"
                    }`}
                  >
                    {trend.title}
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
