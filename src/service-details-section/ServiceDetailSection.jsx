import React from "react";
import { useParams } from "react-router-dom";
import SalesCoaching from "./SalesCoaching";
import Sales_Retain_Service from "./Sales_Retain_Service";
import Crm_selection from "./Crm_selection";
import RecruitmentServices from "./RecruitmentServices";
const ServiceDetailSection = ({ serviceDetails }) => {
  const { slug } = useParams(); // get slug from URL

  if (!serviceDetails) return <p></p>;

  const componentMap = {
    "sales-coaching": SalesCoaching,
    "sales-enablement-retainer-services": Sales_Retain_Service,
    "crm-selection-installation-and-integration": Crm_selection,
    "recruitment-services": RecruitmentServices,
  };

  const SelectedComponent = componentMap[slug];

  return (
    <>
      {SelectedComponent ? (
        <SelectedComponent serviceDetails={serviceDetails} />
      ) : (
        <div className="text-center py-10 w-full lg:w-3/4">
          <h2 className="text-[18px] font-bold text-red-600">Data Not Found</h2>
          <p className="text-gray-600 mt-2">
            The service you are looking for does not exist.
          </p>
        </div>
      )}
    </>
  );
};

export default ServiceDetailSection;
