import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const FilterMobile = ({ filterData }) => {
  if (!filterData) return <p></p>;
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("");
  const [topics, setTopics] = useState({
  });
  const [isOpen, setIsOpen] = useState(false);
  const updateFilter = (setter) => (e) => {
    const { id, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const handleTopicChange = (e) => {
    const { id, checked } = e.target;
    const topicId = id.replace("topic-", "");
    setTopics((prev) => ({
      ...prev,
      [topicId]: checked,
    }));
  };
  const handleApplyFilters = () => {
    setFilters({ location, audience, topics });
    setIsOpen(false);
  };
  return (
    <div>
      <button
        className="md:hidden fixed bottom-24 right-4 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white px-4 py-2  shadow-md z-50"
        onClick={() => setIsOpen(true)}
      >
        Show Filters
      </button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed bottom-0 right-0 h-2/1 w-4/5 z-50 max-w-sm bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 h-full flex flex-col">

          <button
            className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl md:text-3xl transition-all duration-300 ease-in-out bg-transparent  p-2 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-black text-2xl hover:text-red-600 transition-all duration-300 ease-in-out  font-semibold">
              <FaTimes />
            </span>
          </button>


          <div className="flex flex-col w-full flex-1 overflow-y-auto">
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">
                Topics
              </label>
              <div className="space-y-3">
                {filterData?.topics?.map((topic) => (
                  <div key={topic.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`topic-${topic.id}`}
                      checked={topics[topic.id] || false}
                      onChange={handleTopicChange}
                      className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                    />
                    <label
                      htmlFor={`topic-${topic.id}`}
                      className="text-sm cursor-pointer md:text-[16px]"
                    >
                      {topic.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">Location</label>
              <div className="space-y-3">
                {filterData?.location?.map((locationType) => (
                  <div key={locationType} className="flex items-center">
                    <input
                      type="checkbox"
                      id={locationType}
                      checked={location[locationType]}
                      onChange={updateFilter(setLocation)}
                      className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                    />
                    <label
                      htmlFor={locationType}
                      className="text-sm cursor-pointer md:text-[16px]"
                    >
                      {locationType.charAt(0).toUpperCase() + locationType.slice(1)}
                    </label>
                  </div>
                ))}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="viewAll"
                    checked={location.viewAll}
                    onChange={updateFilter(setLocation)}
                    className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                  />
                  <label
                    htmlFor="viewAll"
                    className="text-sm cursor-pointer md:text-[16px]"
                  >
                    View All
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">Audience</label>
              <div className="space-y-3">
                {filterData?.audience?.map((audienceType) => (
                  <div key={audienceType.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={audienceType.id}
                      checked={audience[audienceType.id] || false}
                      onChange={updateFilter(setAudience)}
                      className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                    />
                    <label
                      htmlFor={audienceType.id}
                      className="text-sm cursor-pointer md:text-[16px]"
                    >
                      {audienceType.name}
                    </label>
                  </div>
                ))}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="viewAllAudience"
                    checked={audience.viewAllAudience || false}
                    onChange={updateFilter(setAudience)}
                    className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                  />
                  <label
                    htmlFor="viewAllAudience"
                    className="text-sm cursor-pointer md:text-[16px]"
                  >
                    View All
                  </label>
                </div>
              </div>
            </div>
          </div><button
            onClick={handleApplyFilters}
            className="px-6 group md:px-8 uppercase py-3 md:py-4  bg-gradient-to-r from-[#DB0032] to-[#FF6A00] text-white text-sm md:text-lg font-semibold shadow-lg  transition-all duration-300 focus:outline-none relative overflow-hidden"
          >
            <span className="absolute inset-0 w-0 h-full bg-[#383F71] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            <span className="relative z-10">
              Apply Filters
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default FilterMobile;
