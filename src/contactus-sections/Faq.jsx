import { useState } from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

function Faq({ faqData }) {
  if (!faqData) return <p></p>;
  const [openIndex, setOpenIndex] = useState(null);

  const handleDisclosureClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      <div className="w-full">
        <div className="w-full max-w-3xl bg-white px-4">
          <h1 className="text-sm md:text-lg lg:text-xl xl:text-2xl font-bold uppercase mb-4">
            {faqData.sub_title}
          </h1>

          <div className="mb-12">
            <h1 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-4xl uppercase font-bold">
              <span
                className="about-intro-title"
                dangerouslySetInnerHTML={{ __html: faqData.title }}
              />
            </h1>

            <p className="sm:text-left  sm:leading-6  sm:font-normal text-justify text-sm md:text-base lg:text-lg">
              {faqData.description}
            </p>
          </div>
          <div className="space-y-4">
            {faqData.faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => handleDisclosureClick(index)}
                  className="w-full p-4 text-left font-semibold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-md hover:bg-gradient-to-l flex justify-between items-center transition-all duration-300 ease-in-out"
                >
                  <span className="text-xs sm:text-sm md:text-lg">
                    {faq.title}
                  </span>
                  <span
                    className={`transition-transform duration-300 ease-in-out ${
                      openIndex === index ? "rotate-[-180]" : ""
                    }`}
                  >
                    {openIndex === index ? (
                      <AiOutlineUp className="w-6 h-6" />
                    ) : (
                      <AiOutlineDown className="w-6 h-6" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="px-4 pt-4 pb-2 text-sm text-gray-500 shadow-lg rounded-lg"
                    >
                      {faq.key_note}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center relative">
        <div
          className="absolute right-10
              w-[250px] h-[200px] top-14  sm:right-24
              sm:w-[280px] sm:h-[310px] sm:top-14 2xl:top-10 2xl:right-28 xl:top-10 xl:right-20 md:top-14 md:right-36
              md:w-[300px] md:h-[340px] lg:top-14 lg:right-14 bottom-10 
              lg:w-[310px] lg:h-[330px] 2xl:w-[430px] 2xl:h-[500px] xl:w-[360px] xl:h-[400px] rounded-lg bg-cover bg-no-repeat 
              faq-bg z-0"
        ></div>

        <img
          loading="lazy"
          src={faqData.image}
          alt="FAQ Illustration"
          className="xl:w-[380px] xl:h-[400px] lg:w-[320px] lg:h-[350px] md:w-[360px] md:h-[350px] sm:w-[340px] sm:h-[320px] w-[250px] h-[220px] 2xl:w-[430px] 2xl:h-[500px] 
                relative z-10"
        />
      </div>
    </div>
  );
}

export default Faq;
