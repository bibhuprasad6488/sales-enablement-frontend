import React, { useState, useEffect } from "react";
import QuoteLeft from "../assets/QuotLeft.png";
import RightArrow from "../assets/testi-right-arr.png";
import LeftArrow from "../assets/testi-left-arr.png";
import Play from "../assets/play.png";
import Pause from "../assets/pause.png";
import { motion } from "framer-motion";
function Testimonials({testimonialsData}) {
  if (!testimonialsData) return <p></p>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const nextTestimonial = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
      setIsFading(false);
    }, 500);
  };

  const prevTestimonial = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
      );
      setIsFading(false);
    }, 500);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextTestimonial, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="bg-gradient-2 py-12">
      <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6">
        Testimonials
      </h2>
      <div className="flex justify-center items-center px-4 py-8">
        <div className="bg-white p-6 max-w-3xl">
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={QuoteLeft}
              alt="Quote Icon"
              className="w-12 h-12 inline-block"
            />
            <p className="mt-5 text-black text-sm md:text-xl text-justify sm:text-base">
              {testimonialsData[currentIndex].description}
            </p>
            <div className="flex flex-col items-center sm:flex-row mt-8">
              <img
                src={testimonialsData[currentIndex].profile_img}
                alt="Testimonial"
                className="w-24 h-24 mb-4 sm:mb-0"
              />
              <div className="sm:ml-4 text-center sm:text-left">
                <p className="font-bold text-lg md:text-xl">
                  {testimonialsData[currentIndex].name}
                </p>
                <p className="text-black text-sm mt-2 md:text-lg">
                  {testimonialsData[currentIndex].position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 px-4">
        <div className="flex justify-between items-center w-full max-w-3xl">

          <div className="flex justify-between items-center w-auto">
            <button onClick={prevTestimonial} className="hover:scale-110">
              <img
                src={LeftArrow}
                alt="Previous Testimonial"
                className="w-[30px] h-[30px]"
              />
            </button>
            <button onClick={nextTestimonial} className="p-2 hover:scale-110">
              <img
                src={RightArrow}
                alt="Next Testimonial"
                className="w-[30px] h-[30px]"
              />
            </button>
          </div>

          <div className="flex-grow ml-4">
            <div className="flex h-3 bg-white">
              {testimonialsData.map((_, index) => (
                <motion.div
                  key={index}
                  className={`flex-1 transition-all ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                      : "bg-white"
                  }`}
                  initial={{ opacity: 0.6 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 0.3, 
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <button onClick={togglePlayPause} className="ml-4 hover:scale-110">
              <img
                src={isPlaying ? Pause : Play}
                alt="Play/Pause Button"
                className="w-[30px] h-[30px]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
