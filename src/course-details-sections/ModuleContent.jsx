import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ModuleContent = ({ course }) => {

  if (!course) return <p>

  </p>
  const [openModuleIndex, setOpenModuleIndex] = useState(null);


  const handleDisclosureClick = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const courseModules = course?.course_modules || [];




  return (


    <div className="space-y-6 lg:space-y-8">
      <h1 className="uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        Outline of Topics
      </h1>

      {courseModules.map((module, index) => (
        <div key={index} className="w-full">
          <button
            onClick={() => handleDisclosureClick(index)}
            className="w-full p-4 text-left font-semibold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-md hover:bg-gradient-to-l flex justify-between items-center transition-all duration-300 ease-in-out"
          >
            <span className="text-xs sm:text-sm md:text-lg">{module.title}</span>
            <motion.span
              className="transition-transform duration-300 ease-in-out"
              animate={{ rotate: openModuleIndex === index ? "-180" : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openModuleIndex === index ? (
                <AiOutlineUp className="w-6 h-6" />
              ) : (
                <AiOutlineDown className="w-6 h-6" />
              )}
            </motion.span>
          </button>

          <AnimatePresence>
            {openModuleIndex === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="p-4 bg-gray-100 rounded-md overflow-hidden">
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base md:text-lg">
                    {module.content.split("\r\n").map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        {item}
                      </li>
                    ))}

                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>

  );
};

export default ModuleContent;
