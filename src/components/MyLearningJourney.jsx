import React from 'react';
import { FaCheckCircle, FaBookOpen, FaClipboardList } from 'react-icons/fa';

const MyLearningJourney = () => {
  const courses = [
    { name: 'Professional Selling Skills', progress: 80 },
    { name: 'Communication Skills for Sales Staff', progress: 50 },
    { name: 'Front Line Retail Selling Skills', progress: 30 },

  ];

  const notifications = [
    "New module added in Professional Selling Skills course.",
    "You have a quiz due tomorrow on Communication Skills for Sales Staff.",
    "New resource available for Sales Management course.",
  ];

  const resources = [
    { title: "Sales Skills Guide", link: "https://www.salesforce.com/products/sales-cloud/overview/" },
    { title: "Retail Sales Strategy", link: "https://www.retaildoc.com/blog/sales-strategy" },
    { title: "Sales Management Tips", link: "https://www.saleshacker.com/sales-management/" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mt-8 mb-8">
        <div className="w-24 h-1 rounded-full bg-[#DB0032]"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
        <div className=" bg-white  transition-shadow duration-300">
          <h3 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-center mb-6 text-[#DB0032]">
            Upcoming Goals
          </h3>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
              Complete the Professional Selling Skills course.
            </li>
            <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
              Attend the next workshop on Communication Skills for Sales Staff.
            </li>
            <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
              Finish building my personal portfolio.
            </li>
          </ul>
        </div>


        <div className="space-y-6">
 
          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-center mb-6 text-[#DB0032]">
              Current Courses/Programmes
            </h3>
            <ul className="list-disc pl-6 space-y-4 text-lg">
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Professional Selling Skills
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Communication Skills for Sales Staff
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Front Line Retail Selling Skills
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Sales Management
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Sales Territory Planning & Routing
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Retail Sales Planning and Forecasting
              </li>
            </ul>
          </div>

          {/* Completed Courses */}
          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-center mb-6 text-[#DB0032]">
              Completed Courses/Programmes
            </h3>
            <ul className="list-disc pl-6 space-y-4 text-lg">
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Front Line Retail Selling Skills
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Retail Sales Planning and Forecasting Fundamentals
              </li>
              <li className="transition-all text-base sm:text-lg hover:text-[#DB0032] cursor-pointer">
                Introduction to Professional Selling Skills
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MyLearningJourney;
