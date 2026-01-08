import RightArrow1 from "../assets/arrow-right1.webp";
import RightArrow from "../assets/arrow-right.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function About({ aboutPageData }) {
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    mobile: {
      opacity: 0.5,
      x: "-50%",
    },
  };
  if (!aboutPageData) return <p></p>;
  return (
    <section className="py-12 about-class overflow-hidden container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-center">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={leftVariants}
        >
          <div className="flex justify-center align-middle">
            <div className="about-home-bg ">
              <img
                loading="lazy"
                src={aboutPageData.first_image}
                alt="first_image"
                className="w-[150.38px]  h-[150.38px] sm:w-[234.3px]  sm:h-[230.35px] md:w-[234.3px]  md:h-[230.35px] lg:w-[200px]  lg:h-[200px] xl:w-[234.3px]  xl:h-[230.35px] 2xl:w-[234.3px]  2xl:h-[230.35px] relative top-[-2rem] sm:top-[-4rem] z-20"
              />
              <img
                loading="lazy"
                src={aboutPageData.second_image}
                alt="second_image"
                className="w-[255px] h-[234px] sm:w-[444.01px] sm:h-[402.44px] md:w-[444.01px] md:h-[402.44px] lg:w-[329px] lg:h-[335px] xl:w-[444.01px] xl:h-[402.44px] 2xl:w-[444.01px] 2xl:h-[402.44px] z-10 rounded-lg relative left-[3rem] top-[-6rem] sm:left-16 sm:top-[-10rem]"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="text-center md:text-left overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={rightVariants}
        >
          <h5
            className="text-[22px] sm:text-[24px] md:text-[22px] uppercase font-bold bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-transparent bg-clip-text"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            {aboutPageData.sub_title}
          </h5>
          <h2
            className="text-[20px] sm:text-[24px] md:text-[28px] font-bold uppercase mt-7 mb-7"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            <span
              className="about-intro-title"
              dangerouslySetInnerHTML={{ __html: aboutPageData.title }}
            />
          </h2>

          <p
            className="text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px]  leading-[32px] text-justify mb-8"
            data-aos="fade-left"
          >
            {aboutPageData.description}
          </p>

          <div className="space-y-6 pl-2">
            {Object.entries(aboutPageData.key_points).map(
              ([icon, item], index) => (
                <div className="flex items-start space-x-5" key={index}>
                  <div className="w-[10%]">
                    <div className="w-12 bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:scale-110 h-12 rounded-full flex justify-center items-center pt-1">
                      <div
                        dangerouslySetInnerHTML={{ __html: icon }}
                        className="text-3xl text-white "
                      />
                    </div>
                  </div>
                  <div className="flex items-start w-[90%] gap-6">
                    <div className="w-[30%]">
                      <h5 className="font-bold text-[11px] sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-xl uppercase mt-3 sm:mt-4 md:mt-5 lg:mt-1 xl:mt-3">
                        {item.title}
                      </h5>
                    </div>
                    <div className="w-[70%]">
                      <p className="text-[11px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-4 md:mt-5 lg:mt-1 xl:mt-3">
                        {item.key_note}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex flex-col sm:flex-wrap md:flex-wrap   lg:flex-row xl:flex-nowrap 2xl:flex-nowrap justify-between gap-4 mt-8">
            <Link
              to={aboutPageData.btn_one_link}
              type="button"
              className="relative text-white group text-nowrap transition-all duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-xs sm:text-sm px-5 py-2.5 w-full md:px-6 md:py-3 md:w-auto lg:w-full xl:w-auto 2xl:w-auto flex items-center justify-center"
            >
              <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>

              <span className="relative z-10 text-white group-hover:text-white flex items-center">
                {aboutPageData.btn_one_text}
                <img
                  loading="lazy"
                  src={RightArrow1}
                  alt="Arrow Icon"
                  className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out "
                />
              </span>
            </Link>

            <Link
              to={aboutPageData.btn_two_link}
              type="button"
              className="text-[#000] transition-transform duration-500 ease-out transform  flex md:px-10 lg:px-10 xl:px-6 text-nowrap md:py-3  md:w-auto lg:w-full xl:w-auto 2xl:w-auto  uppercase gap-3 justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-between 2xl:justify-between space-x-2 items-center font-bold text-xs sm:text-sm px-4 py-2 hover:text-[#000]  border-[#000] border-btn2"
            >
              {aboutPageData.btn_two_text}
              <img
                loading="lazy"
                src={RightArrow}
                alt="Arrow"
                className="w-[24px] h-[24px]"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
