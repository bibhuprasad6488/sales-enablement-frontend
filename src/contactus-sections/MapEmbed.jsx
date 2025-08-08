import { FaCommentDots } from "react-icons/fa";

const MapSection = ({ mapData }) => {
  if (!mapData) return <p></p>;

  return (
    <div className="py-12 about-class container mx-auto px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-center">

        <div className="w-full text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold uppercase text-gray-800 mb-4">
            {mapData.title}
          </h2>
          <p className="text-base text-gray-600 mb-6">
            {mapData.description}
          </p>
          <button onClick={() => handleButtonClick(mapData.btn_link)} className="relative uppercase font-medium text-white transition-all duration-300 ease-in-out overflow-hidden group bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none shadow-lg flex items-center justify-center text-sm md:text-[14px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] px-5 py-2.5 w-full md:px-2 md:py-2 lg:px-3 lg:py-3 xl:px-6 xl:py-3 md:w-[250px] lg:w-auto xl:w-auto">
            <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>

            <span className="relative text-white flex items-center">
              <FaCommentDots className="mr-2" />
              {mapData.btn_text}
            </span>
          </button>
        </div>


        <div className="w-full flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.6420069199366!2d28.03582567616495!3d-26.14321306149427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950de5e2952bab%3A0x50020f3be991042a!2sThe%20Sales%20Enablement%20Company!5e0!3m2!1sen!2sin!4v1737106163318!5m2!1sen!2sin"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full max-w-4xl h-[300px] rounded-md shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
