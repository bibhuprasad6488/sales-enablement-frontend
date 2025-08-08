import React, { useState } from "react";
import { useFilter } from "../context/FilterContextApi";

const CourseSidebar = () => {
  const {
    topics,
    locations,
    audiences,
    selectedTopics,
    selectedLocations,
    selectedAudiences,
    updateTopicFilter,
    updateLocationFilter,
    updateAudienceFilter,
    loading,
    updateAllLocations,
    error,
  } = useFilter();
  const [isOpen, setIsOpen] = useState(false);
  const handleTopicChange = (e) => {
    const { id, checked } = e.target;
    updateTopicFilter(id, checked);
  };
  const handleLocationChange = (e) => {
    const { id, checked } = e.target;
    updateLocationFilter(id, checked);
  };
  const handleAudienceChange = (e) => {
    const { id, checked } = e.target;
    updateAudienceFilter(id, checked);
  };
  if (loading) return <p>Loading filters...</p>
  if (error) return <p>Error loading filters: {error}</p>
  return (
    <aside className={`w-full md:w-1/4 h-auto md:block ${isOpen ? "block" : "hidden"}`}>
      <button
        className="md:hidden fixed top-4 left-4 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white px-4 py-2 rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col w-full p-4 ">

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">Topics</label>
          <div className="space-y-4">
            {Array.isArray(topics) && topics.length > 0 ? (
              topics.map((topic) => (
                <div key={topic.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={topic.name}
                    checked={selectedTopics?.includes(topic.name) || false}
                    onChange={handleTopicChange}
   className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                  />
                  <label htmlFor={topic.name} className="text-sm cursor-pointer md:text-[16px]">
                    {topic.name}
                  </label>
                </div>
              ))
            ) : (
              <p>No topics available</p>
            )}
          </div>
        </div><div className="mb-6">
  <label className="block text-lg font-semibold mb-3">Location</label>
  <div className="space-y-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="all-locations"
        checked={selectedLocations.length === locations.length} 
        onChange={(e) => {
          if (e.target.checked) {
            updateAllLocations(true); 
          } else {
            updateAllLocations(false); 
          }
        }}
        className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none cursor-pointer"
      />
      <label htmlFor="all-locations" className="text-sm font-semibold cursor-pointer md:text-[16px]">
        View All
      </label>
    </div> {Array.isArray(locations) && locations.length > 0 ? (
      locations.map((location, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={location}
            checked={selectedLocations.includes(location)}
            onChange={(e) => updateLocationFilter(location, e.target.checked)}
            className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none cursor-pointer"
          />
          <label htmlFor={location} className="text-sm cursor-pointer md:text-[16px]">
            {location}
          </label>
        </div>
      ))
    ) : (
      <p>No locations available</p>
    )}
  </div>
</div> <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">Audience</label>
          <div className="space-y-4">
            {Array.isArray(audiences) && audiences.length > 0 ? (
              audiences.map((audience) => (
                <div key={audience.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={audience.name}
                    checked={selectedAudiences?.includes(audience.name) || false}
                    onChange={handleAudienceChange}
                      className="mr-2 checkbox-custom w-5 h-5 border-2 hover:border-[#FA6602] border-[#DB0032] rounded-sm appearance-none relative transition-all ease-in cursor-pointer"
                  />
                  <label htmlFor={audience.name} className="text-sm cursor-pointer md:text-[16px]">
                    {audience.name}
                  </label>
                </div>
              ))
            ) : (
              <p>No audience options available</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
export default CourseSidebar;
