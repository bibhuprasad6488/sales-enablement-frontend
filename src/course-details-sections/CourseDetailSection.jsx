import { FaArrowDown, FaBook } from "react-icons/fa";
import TabNavigation from "../components/TabNavigation";
import RelatedCourseSlider from "./RelatedCourseSlider";
import PriceSideBar from "./PriceSideBar";
import { Helmet } from "react-helmet-async";
import { useApi3 } from "../context/WebsiteDataContext";
const CourseDetailSection = ({ courseData }) => {
  if (!courseData) return <p></p>

    
    const { websiteData,  } = useApi3();
        if (!websiteData) return <p></p>
  return (


    <>
  <Helmet>
  <title>{courseData?.meta_title || ""} | {websiteData?.title || ""}</title>

        <meta name="description" content={courseData.meta_description} />
        <meta name="keywords" content={courseData.meta_keywords} />
        <meta property="og:title" content={courseData.og_title}/>
        <meta property="og:description" content={courseData.og_description} />
        <meta property="og:image" content={courseData.og_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

        <section className=" w-full mx-auto py-6 px-3">
      <div className="w-full">
        <h2 className="text-xl lg:text-3xl font-semibold  flex items-center mb-6">
          <span className="font-semibold text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] w-10 h-10 mr-3  rounded-full flex justify-center items-center transition-all duration-300">
            <FaBook size={20} />
          </span>{" "}
          {courseData.name}
        </h2>
      </div>

      <div className="max-w-6xl">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          Overview
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-justify font-light max-w-full sm:max-w-3xl md:max-w-5xl">
          {courseData.description_one}
        </p>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center py-12 ">

        <div className="px-6 py-16 shadow-xl w-full lg:w-4/5">
          <div className="max-w-5xl">



            <h1 className="text-sm sm:text-xl md:text-xl lg:text-2xl font-bold mb-6">
              {courseData.title_two}
            </h1>
            <p className="text-sm sm:text-base md:text-lg  text-justify font-light max-w-full sm:max-w-3xl md:max-w-4xl mb-8">
              {courseData.description_two}
            </p>


            <hr />


            <div className="flex flex-col lg:flex-row justify-between gap-6 mt-4">
              {/* How Will You Benefit Section */}
              <div className="w-full lg:w-3/5">
              <div
                  className="text-left font-light text-sm md:text-base space-y-2 "
                  dangerouslySetInnerHTML={{ __html: courseData.benifit_desc }}
                />
              </div>

              {/* Who Should Attend Section */}
              <div className="w-full lg:w-2/5">
                <div
                  className="text-left font-light text-sm md:text-base space-y-2 "
                  dangerouslySetInnerHTML={{ __html: courseData.attend_desc }}
                />
              </div>
            </div>


            <div className="mt-6 flex flex-wrap justify-between gap-6">

              <div className="w-full sm:w-auto">
                <a
                  href=  {courseData.benifit_btn_link}
                  download
                  className="relative text-xs sm:text-sm   w-full uppercase  px-6 py-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] group text-white flex items-center justify-center sm:justify-start space-x-2"
                >
                  <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                  <span className="relative z-10 text-white group-hover:text-white flex gap-2 items-center">
              {courseData.benifit_btn_text}
                    <FaArrowDown />
                  </span>
                </a>
              </div>

              <div className="w-full sm:w-auto">
                <a
                  href=        {courseData.attend_btn_link}
                  download
                  className="relative w-full text-xs sm:text-sm  uppercase px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] group text-white flex items-center justify-center sm:justify-start space-x-2"
                >
                  <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                  <span className="relative z-10 text-white group-hover:text-white flex gap-2 items-center">
                  {courseData.attend_btn_text}
                    <FaArrowDown />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full lg:w-1/3">
          <PriceSideBar course={courseData}/>
        </div>
      </div>

      <div className="mt-4"> 
      <div
                  className="text-left font-light text-sm md:text-base space-y-2 "
                  dangerouslySetInnerHTML={{ __html: courseData.tab_three_desc }}
                />
      </div>


      <div className="py-12">
        <TabNavigation course={courseData}/>
      </div>

      <h1 className="text-xl md:text-xl lg:text-2xl  font-semibold text-gray-900">Related Courses</h1>
      <div className="py-12">
        <RelatedCourseSlider course={courseData} courseId={courseData.id}/>
      </div>
    </section>
    </>

  );
};

export default CourseDetailSection;

