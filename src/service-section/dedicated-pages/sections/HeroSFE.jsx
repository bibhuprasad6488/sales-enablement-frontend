import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import Navbar from "../../../components/Navbar";
function HeroSFE({salesForceEvaluation}) {
  if(!salesForceEvaluation) return <p></p>
  return (
    <>
      <section>
        <div className="relative w-full h-full z-30 course-bg">
          <div className="relative   bg-layer">
            <Navbar />

            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16 ">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
             {salesForceEvaluation?.title}
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20 ">
            <Breadcrumb breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label:   salesForceEvaluation?.title }]} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSFE;
