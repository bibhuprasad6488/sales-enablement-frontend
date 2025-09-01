import React, { useEffect, useState } from "react";
import HeroServiceDetails from "../service-details-section/HeroServiceDetails";
import ServiceDetailSection from "../service-details-section/ServiceDetailSection";
import ServiceDetailSideBar from "../service-details-section/ServiceDetailSideBar";
import axios from "../api/axios"
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useApi3 } from "../context/WebsiteDataContext";
function ServiceDetails() {
  const { websiteData,  } = useApi3();
        if (!websiteData) return <p></p>
  const { slug } = useParams();
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/services-details/${slug}`);
        console.log("API Response:", res.data);
        if (res.data && res.data.data) {
          setData(res.data.data);
    
    
        } else {
          setError("Service not found");
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);
  return (
    <>
      <Helmet>
      <title>{data?.meta_title || ""} | {websiteData?.title || ""}</title>

        <meta name="description" content={data?.meta_description} />
        <meta name="keywords" content={data?.meta_keywords} />
        <meta property="og:title" content={data?.og_title} />
        <meta property="og:description" content={data?.og_description} />
        <meta property="og:image" content={data?.og_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>


      <HeroServiceDetails serviceDetails={data} loading={loading}/>

      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-10">
          <ServiceDetailSection serviceDetails={data} loading={loading} />
          <ServiceDetailSideBar />
        </div>
      </div>
      
    </>
  );
}

export default ServiceDetails;

