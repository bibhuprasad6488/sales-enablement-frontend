import React from "react";

const BenefitsSection = ({ salesForceEvaluation }) => {
  if (!salesForceEvaluation) return <p></p>;
  return (
    <section className="py-16 px-6 banner">

      <h2 className="text-[20px]  md:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-10 text-white relative z-10">
        {salesForceEvaluation.ev_tool_title}
      </h2>


      <div className="px-4 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {Object.entries(salesForceEvaluation?.tool_features || {}).map(([icon, feature], index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 icon-hover space-y-4 hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out relative z-10"
          >
            <div className="p-4 bg-transparent  w-20 h-20 flex items-center justify-center rounded-full icon-hover3 text-[#DB0032]">
              <span className="text-3xl" dangerouslySetInnerHTML={{ __html: icon }}></span>
            </div>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-lg">{feature.key_note}</p>
            </div>
          </div>
        ))}
        
      </div>


    </section>
  );
};

export default BenefitsSection;
