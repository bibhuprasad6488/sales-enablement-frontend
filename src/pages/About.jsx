import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Helmet } from "react-helmet-async";
import { useApi3 } from "../context/WebsiteDataContext";
import HeroAbout from "../about-section/HeroAbout";
import WhyChoseUs from "../about-section/WhyChoseUs";
import VisionMission from "../about-section/VisionMission";
import AboutUs from "../about-section/AboutUs";
import Achievement from "../about-section/Achievement";
import Awards from "../about-section/AwardSection";
import Cards from "../about-section/Cards";
import Expertise from "../about-section/Expertise";
import { Bars } from "react-loader-spinner";

function About() {
  const { websiteData } = useApi3();
  if (!websiteData) return <p></p>;

  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/about-us");
        setData(res.data.data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { about_data, mission_data, awards, vision_data, values_data, why_choose_us, experts, award_data } = data || {};
  if (isLoading) {
    return (
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
          <Bars height="80" width="80" color="#FFFFFF" ariaLabel="bars-loading" visible={true} />
        </div>
      </div>
    );
  }

  if (!about_data) return <p></p>;

  return (
    <>
      <Helmet>
        <title>{about_data.meta_title} | {websiteData.title}</title>
        <meta name="description" content={about_data.meta_description} />
        <meta name="keywords" content={about_data.meta_keywords} />
        <meta property="og:title" content={about_data.og_title} />
        <meta property="og:description" content={about_data.og_description} />
        <meta property="og:image" content={about_data.og_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="flex flex-col space-y-16 transition-opacity duration-1000 opacity-100">
        <HeroAbout />
        <AboutUs aboutData={about_data} error={error} />
        <VisionMission missionData={mission_data} visionData={vision_data} valueData={values_data} error={error} />
        <WhyChoseUs whyChoseUs={why_choose_us} error={error} />
        <Achievement archivementData={data.archivement} error={error} />
        <Expertise expertsData={experts} error={error} />
        <Awards awardData={award_data} error={error} />
        <Cards awardsData={awards} error={error} />
      </div>
    </>
  );
}

export default About;
