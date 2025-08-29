import React from "react";

const ServiceDetailSection = ({ serviceDetails }) => {
  if (!serviceDetails) return <p></p>;

  return (
    <section className="md:w-full w-full lg:w-3/4 mx-auto">
      {/* Service Main Image */}
      {/* <div className="md:w-full lg:w-full md:ml-8 xl:w-full xl:ml-0 mt-6 md:mt-0 mb-6 relative">
        <img
          src={serviceDetails.image}
          alt={serviceDetails.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div> */}

      {/* Title */}
      <div className="flex flex-col md:flex-row items-center ">
        <div className="w-full xl:w-2/3">
          <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 flex items-center">
            {serviceDetails.title}
          </h2>
          <svg
            className="mt-2"
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="4"
            viewBox="0 0 120 4"
            fill="none"
          >
            <rect width="150" height="12" rx="3" fill="#DB0032" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <p
          className="mb-4 prose max-w-none text-sm sm:text-sm md:text-base font-light sm:font-normal px-6 text-center flex-1"
          dangerouslySetInnerHTML={{
            __html: serviceDetails.description,
          }}
        ></p>
      </div>

      {/* <div className="py-12 px-6 bg-gray-100">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-center">
          {serviceDetails.feature_title}
        </h2>
        <p className="text-center text-sm md:text-base lg:text-lg mt-2">
          {serviceDetails.feature_description}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {Object.entries(serviceDetails?.feature_points || {}).map(
            ([icon, feature], index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] shadow-md p-6 rounded-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-white text-3xl">
                    <span dangerouslySetInnerHTML={{ __html: icon }}></span>
                  </div>
                  <h3 className="text-white text-sm font-bold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white text-sm font-light mt-2">
                  {feature.key_note}
                </p>
              </div>
            )
          )}
        </div>
      </div> */}
    </section>
  );
};

export default ServiceDetailSection;
