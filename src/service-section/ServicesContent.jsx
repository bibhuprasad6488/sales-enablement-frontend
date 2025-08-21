import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ServiceContent = ({ serviceData }) => {
  if (!serviceData) return <p></p>;

console.log("all",serviceData);


  return (
    <>
      <section className=" py-10">
        <div className=" container">
          <h2 className="text-sm sm:text-base lg:text-lg uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text font-bold mb-2 sm:mb-4 lg:mb-6">
            Consulting & Services
          </h2>

          <div>
            <h1 className="text-sm sm:text-2xl lg:text-3xl font-bold uppercase lg:leading-[48px] mb-5">
              Professional Sales Enablement <br />
              <span className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text">
                Services Can Drive Success
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
            {serviceData.map((service, index) => (
              <div
                className="border-2 flex flex-col h-full"
                style={{
                  borderImage: "linear-gradient(to right, #DB0032, #FA6602) 1",
                }}
              >
                <div className="relative flex-1" key={index}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[233px] p-2 object-cover mb-4 transition-all duration-500 ease-in-out hover:grayscale-0 hover:opacity-90"
                  />

                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full flex items-center justify-center shadow-md">
                    <div className="flex items-center justify-center transition-transform text-white duration-300 ease-in-out transform hover:rotate-y-180">
                      <div
                        className="text-3xl text-white"
                        dangerouslySetInnerHTML={{ __html: service.icon }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-sm  lg:text-lg uppercase font-semibold mb-2 p-4 text-center">
                  {service.title}
                </h3>

              <p className="mb-4 prose text-sm sm:text-sm md:text-base font-light sm:font-normal px-6 text-center flex-1">
  {service.description.replace(/<[^>]+>/g, '').slice(0, 80) + '...'}
</p>
                <div className="flex justify-center">
                  <Link
                    to={
                      service.indp === "1"
                        ? `/service/sales-force-details/${service.slug}`
                        : service.indp === "2"
                        ? `/service/sales-candidate-details/${service.slug}`
                        : `/service/${service.slug}`
                    }
                    state={service}
                    className="relative w-[86%] icon-hover mb-4 px-6 py-3 flex items-center justify-center font-medium text-xs sm:text-sm  text-[#DB0032] border-2 border-transparent rounded-md transition-all duration-500 ease-out hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #DB0032, #FA6602) 1",
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#DB0032] to-[#FA6602] opacity-0 hover:opacity-100 transition-opacity duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center">
                      LEARN MORE
                      <FaArrowRight className="w-5 h-5 icon-hover2 ml-2 text-[#DB0032] transition-colors duration-500 ease-out hover:text-white" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceContent;
