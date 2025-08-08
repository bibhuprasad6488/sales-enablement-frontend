import React from "react";
import {
  FiBook,
  FiUsers,
  FiTarget,
  FiMonitor,
  FiPhoneCall,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";
const iconMap = {
  1: <FiBook className="text-current" size={32} />,
  3: <FiUsers className="text-current" size={32} />,
  4: <FiTarget className="text-current" size={32} />,
  5: <FiMonitor className="text-current" size={32} />,
  6: <FiClock className="text-current" size={32} />,
  7: <FiPhoneCall className="text-current" size={32} />,
};
const WhyChoseUs = ({ whyChoseUs }) => {
  if (!whyChoseUs || !Array.isArray(whyChoseUs) || whyChoseUs.length === 0) {
    return <p className="text-center text-white"></p>;
  }
  return (
    <motion.section
      className="py-12 bg-[linear-gradient(to_right,_#060b33_0%,_#383f71_100%)] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: "easeOut", staggerChildren: 0.3 },
        },
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="sm:text-3xl text-2xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChoseUs.map((feature) => (
            <motion.div
              key={feature.proposes_id}
              className="p-6 bg-white rounded-lg text-black shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#DB0032] hover:to-[#FA6602] group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="transition-colors duration-300 group-hover:text-white">
                  {iconMap[feature.id] || <FiBook size={32} />}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-sm group-hover:text-white">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChoseUs;
