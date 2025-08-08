
import React, { useEffect, useState } from "react";
import HeroServices from "../service-section/HeroServices";
import ServiceContent from "../service-section/ServicesContent";
import WhyChooseUs from "../service-section/WhyChooseUs";
import ScheduleConsultation from "../service-section/ScheduleConsultation";
import axios from "../api/axios"
function ServicesPage() {

  const [data, setData] = useState({})
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/all-services");
        setData(res.data);
       
      } catch (error) {
        setError("Failed to fetch data")
      }
    }
    fetchData();
  }, [])
  return (
    <div>
       
      <HeroServices />
      <div className="container mx-auto px-4 py-12  ">
        <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold uppercase sm:leading-[38px] lg:leading-[48px] mb-3 lg:mb-5">
          All{" "}
          <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
            the Services You
          </span>
          <br /> Need in One Place
        </h1>
        <hr className="border-t-2 py-2 sm:py-3 lg:py-5" />
        <p className=" sm:leading-6 leading-5 sm:font-normal text-justify text-sm md:text-base lg:text-lg">
          From comprehensive sales strategies to tailored training programs, our
          services are designed to elevate your business at every level. Whether
          you're optimizing your sales force, streamlining your recruitment
          process, or enhancing your CRM system, we provide the solutions you
          need to succeed.
        </p>
        <div className="flex flex-col md:flex-row py-2 lg:py-12 gap-10">
          <ServiceContent serviceData={data.data} />
        </div>
      </div>
      <div className="py-12">
        <div className="consultation-bg ">
          <div className="bg-layer">
            <ScheduleConsultation />
          </div>
        </div>
      </div>
      <div>
        <WhyChooseUs className="mt-10" />
      </div>
    </div>
  );
}

export default ServicesPage;
