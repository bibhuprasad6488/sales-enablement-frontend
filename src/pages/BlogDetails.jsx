import React, { useState } from "react";
import BlogSideBar from "../blog-sections/BlogSideBar";
import BlogDetailSection from "../blog-details-sections/BlogDetailSection";
import BlogDetailsHero from "../blog-details-sections/BlogDetailsHero";

function BlogDetails() {
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
      <BlogDetailsHero />
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col md:flex-row py-12 gap-10">
          <BlogDetailSection filters={filters} />
          <BlogSideBar setFilters={setFilters} filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
