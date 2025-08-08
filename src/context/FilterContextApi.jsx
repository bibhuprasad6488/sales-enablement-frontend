import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
const FilterContext = createContext();
export const useFilter = () => useContext(FilterContext);
export const FilterProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [locations, setLocations] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get("/get-cat-filtre");
        console.log("✅ Filters API Response:", res.data);

        setTopics(res.data.data?.topics || []);
        setLocations(res.data.data?.location || []);
        setAudiences(res.data.data?.audience || []);
      } catch (error) {
        console.error("❌ Error fetching filters:", error);
        setError("Failed to fetch filters");
      }
    };
    fetchFilters();
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.post("/courses");
        console.log("✅ Courses API Response:", res.data);

        const courseData = Array.isArray(res.data.data) ? res.data.data : [];
        setCourses(courseData);
        setFilteredCourses(courseData);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (selectedTopics.length) {
        filtered = filtered.filter((course) => {
          return course.category.some((cat) => selectedTopics.includes(cat));
        });
      }


      if (selectedLocations.length) {
        filtered = filtered.filter((course) =>
          Array.isArray(course.course_type)
            ? course.location.some((loc) => selectedLocations.includes(loc))
            : selectedLocations.includes(course.course_type)
        );
      }
      

    if (selectedAudiences.length) {
      filtered = filtered.filter((course) =>
        Array.isArray(course.audience)
          ? course.audience.some((aud) => selectedAudiences.includes(aud))
          : selectedAudiences.includes(course.audience)
      );
    }

    setFilteredCourses(filtered);
  }, [selectedTopics, selectedLocations, selectedAudiences, courses]);


  const updateTopicFilter = (topicName, isChecked) => {

    setSelectedTopics((prev) => {
      const updatedTopics = isChecked ? Array.from(new Set([...prev, topicName])) : prev.filter((name) => name !== topicName);
      return updatedTopics;
    });
  };
  

  const updateLocationFilter = (locationName, isChecked) => {
    setSelectedLocations((prev) =>
      isChecked ? [...prev, locationName] : prev.filter((name) => name !== locationName)
    );
  };

  const updateAllLocations = (selectAll) => {
    setSelectedLocations(selectAll ? [...locations] : []);
  };

  const updateAudienceFilter = (audienceName, isChecked) => {
    setSelectedAudiences((prev) =>
      isChecked ? [...prev, audienceName] : prev.filter((name) => name !== audienceName)
    );
  };

  return (
    <FilterContext.Provider
      value={{
        topics,
        locations,
        audiences,
        filteredCourses,
        loading,
        error,
        selectedTopics,
        selectedLocations,
        selectedAudiences,
        updateTopicFilter,
        updateLocationFilter,
        updateAudienceFilter,
        updateAllLocations
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
