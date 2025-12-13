import React from "react";
import { motion } from "framer-motion";

const Cards = ({ awardsData }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", bounce: 0.3 },
    },
    hover: {
      scale: 1.05,
      rotate: 3,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#f8f9fa",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  if (!awardsData || !Array.isArray(awardsData) || awardsData.length === 0) {
    return <p className="text-center text-white"></p>;
  }


  return (
    <section className="py-6 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {awardsData.map((card, index) => (
          <motion.div
            key={card.id}
            className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <img
              src={card?.image}
              loading="lazy"
              alt={`Logo ${index + 1}`}
              className="w-24 h-24 object-contain mb-4"
            />
            <h5 className="text-xl font-bold text-center">
              {card.title} {""} ({card.date})
            </h5>
            <p className="mt-2 text-center">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
