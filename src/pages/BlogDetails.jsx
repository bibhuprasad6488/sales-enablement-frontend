import React, { useState, useEffect } from "react";
import BlogSideBar from "../blog-sections/BlogSideBar";
import BlogDetailSection from "../blog-details-sections/BlogDetailSection";
import BlogDetailsHero from "../blog-details-sections/BlogDetailsHero";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Helmet } from "react-helmet-async";
function BlogDetails() {
  const { slug } = useParams();
  const [BlogdetailsData, setBlogdetailData] = useState([]);
  useEffect(() => {
    const blogFun = async () => {
      const response = await axios.get(`/blog-details/${slug}`);
      const result = await response.data;

      setBlogdetailData(result);
    };
    blogFun();
  }, []);
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
      <Helmet>
        <title>{BlogdetailsData?.blog_details?.meta_title}</title>
        <meta
          name="description"
          content={BlogdetailsData?.blog_details?.meta_description}
        />
        <meta
          name="keywords"
          content={BlogdetailsData?.blog_details?.meta_keywords}
        />
        <meta
          property="og:title"
          content={BlogdetailsData?.blog_details?.og_title}
        />
        <meta
          property="og:description"
          content={BlogdetailsData?.blog_details?.og_description}
        />
        <meta
          property="og:image"
          content={BlogdetailsData?.blog_details?.og_image}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <BlogDetailsHero titles={BlogdetailsData?.blog_details?.title} />
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col md:flex-row py-12 gap-10">
          <BlogDetailSection
            className="w-full" // Make full width on mobile
            filters={filters}
            Allblogdata={BlogdetailsData?.blog_details}
            whitepaper={BlogdetailsData?.white_papers}
            videos={BlogdetailsData?.videos}
            Blogcomments={BlogdetailsData?.comments}
          />
          <BlogSideBar
            className="w-full md:w-auto" // Full width on mobile, auto on desktop
            setFilters={setFilters}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
