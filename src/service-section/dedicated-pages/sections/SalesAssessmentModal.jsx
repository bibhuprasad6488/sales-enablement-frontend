import React from "react";
import RightArrow1 from "../../../assets/arrow-right1.webp";

const SalesAssessmentModal = ({ toggleModal }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Sales Assessment
          </h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={toggleModal}
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Business Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Phone</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-6">
            {[
              "Do you have a formal sales process that everyone follows?",
              "Are your salespeople effective at selling value?",
              "Do your salespeople use Consultative selling strategies?",
              "Do you have a formal sales recruiting process that consistently yields top performing salespeople?",
              "Do you use sales specific pre-hire assessments?",
              "Do you have a formal 90-day onboarding process that prepares salespeople for success in your company?",
              "Does your pipeline accurately predict future revenue?",
              "Are your probabilities based on science? (As opposed to gut feel)",
              "Are there enough opportunities in your pipeline?",
              "Do you know the activities you need to focus on to consistently overachieve?",
              "Have you identified all the leading KPI's that drive sales?",
              "Do you conduct a weekly personal review with each of your salespeople?",
              "Does your sales manager know what motivates each individual in his/her team?",
              "Do your incentive plans drive the right behaviour?",
              "Does your sales manager have scheduled weekly coaching calls with their team members?",
              "Do you know how effective your Sales Managers are at coaching?",
              "Do you know what potential can be unlocked from your team?",
              "Do you have a clearly articulated Sales Strategy to get your unfair share of your market against your competitors?",
              "Can your sales team execute on your Sales Strategies moving forward?",
              "Can your sales team clearly differentiate themselves from your competition?",
              "Is your salespeople's “Will To Sell” strong enough?",
              "Do your salespeople have a supportive mindset?",
              "Does your current sales culture support your business growth goals?",
              "Do your Sales Managers have a supportive mindset?",
            ].map((question, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  {question}
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="Yes"
                      className="form-radio focus:ring-blue-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="No"
                      className="form-radio focus:ring-red-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="relative w-full py-3 text-white font-bold text-sm uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none  flex justify-center items-center"
            >
              <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
              <span className="relative z-10 flex items-center">
                Submit
                <img
                  src={RightArrow1}
                  alt="Arrow Icon"
                  className="w-6 h-6 ml-2 transition-transform duration-300"
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesAssessmentModal;
