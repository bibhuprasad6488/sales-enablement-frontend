import React, { useState } from "react";
import HeroBlog from "../blog-sections/HeroBlog";
import BlogContent from "../blog-sections/BlogContent";
import BlogSideBar from "../blog-sections/BlogSideBar";
import { useParams } from "react-router-dom"; 
import axios from "../api/axios";
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

  // const {slug} = useParams()
  // const [BlogpageData,setBlogpageData] = useState([])
  // useEffect(()=>{
  //   const blogFun =async ()=>{
  //     const response = await axios.get(`/data/${slug}`)
  //     const result = await response.data
  //     setBlogpageData(BlogpageData)
  //   }
  // },[])
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
