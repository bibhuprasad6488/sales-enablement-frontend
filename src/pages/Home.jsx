
import React, { useEffect, useState } from "react";
import "../home-sections/home.css";
import HeroSection from "../home-sections/HeroSection";
import About from "../home-sections/About";
import Services from "../home-sections/Services";
import GetInTouch from "../home-sections/GetInTouch";
import CaseStudies from "../home-sections/CaseStudies";
import Testimonials from "../home-sections/Testimonialss";
import OurCourses from "../home-sections/OurCourses";
import LatestBlogs from "../home-sections/LatestBlogs";
import FooterSubscribe from "../home-sections/FooterSubscribe";
import axios from "../api/axios";
import { Helmet } from "react-helmet-async";
import { useApi3 } from "../context/WebsiteDataContext";
import { Bars } from "react-loader-spinner"; 

function Home() {
  const { websiteData, loading: websiteLoading } = useApi3();

  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/home-page");
        setData(res.data.data);
      } catch (error) {
        setError("Failed to fetch data");
    
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
        }, 2000);
      }
    };

    fetchData();
  }, []);


  const { consultation, page_banners, page_data, testimonials } = data || {};

  return (
    <>
      {isLoading || websiteLoading ? (
        <div
          style={{
            background: "linear-gradient(to right, #DB0032, #FA6602)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="flex flex-wrap">
            <Bars
              height="80"
              width="80"
              color="#FFFFFF"
              ariaLabel="bars-loading"
              visible={true}
            />
          </div>
        </div>
      ) : (
  
        <div
          className={`transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <Helmet>
            <title>{websiteData?.meta_title}</title>
            <meta name="description" content={websiteData?.meta_description} />
            <meta name="keywords" content={websiteData?.meta_keywords} />
            <meta property="og:title" content={websiteData?.og_title} />
            <meta property="og:description" content={websiteData?.og_description} />
            <meta property="og:image" content={websiteData?.og_image} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
          </Helmet>

          <div className="flex flex-col space-y-16">
            <HeroSection heroData={page_banners} />
            <OurCourses />
            <About aboutPageData={page_data} />
            <Services consultationData={consultation} />
            <GetInTouch />
            <CaseStudies />
            <Testimonials testimonialsData={testimonials} />
            <LatestBlogs />
            <FooterSubscribe />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
