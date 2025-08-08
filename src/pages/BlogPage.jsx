import React, { useState } from "react";
import HeroBlog from "../blog-sections/HeroBlog";
import BlogContent from "../blog-sections/BlogContent";
import BlogSideBar from "../blog-sections/BlogSideBar";
function BlogPage() {
  const [filters, setFilters] = useState({
    location: "both",
    audience: "both",
    topics: {
      sellingSkills: false,
      frontlineRetail: false,
      salesManagement: false,
      territoryPlanning: false,
      retailPlanning: false,
      communicationSkills: false,
    },
    searchTerm: "",
  });

  return (
    <div>
      <HeroBlog />
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col md:flex-row py-12 gap-10">
          <BlogContent filters={filters} />
          <BlogSideBar setFilters={setFilters} filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
