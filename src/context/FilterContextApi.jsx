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

  // Fetch filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get("/get-cat-filtre");
        console.log("✅ Filters API Response:", res.data);

        setTopics(res.data.data?.topics || []);
        setLocations(res.data.data?.location || []);
        setAudiences(res.data.data?.audience || []);
      } catch (err) {
        console.error("❌ Error fetching filters:", err);
        setError("Failed to fetch filters");
      }
    };
    fetchFilters();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.post("/courses");
        console.log("✅ Courses API Response:", res.data);

        const courseData = Array.isArray(res.data.data) ? res.data.data : [];
        setCourses(courseData);
        setFilteredCourses(courseData);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = courses;

    // Topic filter
    if (selectedTopics.length) {
      filtered = filtered.filter((course) => {
        const categories = Array.isArray(course.category)
          ? course.category
          : [];
        return categories.some((cat) => selectedTopics.includes(cat));
      });
    }

    // Location filter
    if (selectedLocations.length) {
      filtered = filtered.filter((course) => {
        const locs = Array.isArray(course.location)
          ? course.location
          : [course.course_type];
        return locs.some((loc) => selectedLocations.includes(loc));
      });
    }

    // Audience filter
    if (selectedAudiences.length) {
      filtered = filtered.filter((course) => {
        const auds = Array.isArray(course.audience) ? course.audience : [];
        return auds.some((aud) => selectedAudiences.includes(aud));
      });
    }

    setFilteredCourses(filtered);
  }, [selectedTopics, selectedLocations, selectedAudiences, courses]);

  // Update filter functions
  const updateTopicFilter = (topicName, isChecked) => {
    setSelectedTopics((prev) =>
      isChecked
        ? Array.from(new Set([...prev, topicName]))
        : prev.filter((name) => name !== topicName)
    );
  };

  const updateLocationFilter = (locationName, isChecked) => {
    setSelectedLocations((prev) =>
      isChecked
        ? Array.from(new Set([...prev, locationName]))
        : prev.filter((name) => name !== locationName)
    );
  };

  const updateAllLocations = (selectAll) => {
    setSelectedLocations(selectAll ? [...locations] : []);
  };

  const updateAudienceFilter = (audienceName, isChecked) => {
    setSelectedAudiences((prev) =>
      isChecked
        ? Array.from(new Set([...prev, audienceName]))
        : prev.filter((name) => name !== audienceName)
    );
  };

  // Optional: reset all filters
  const resetAllFilters = () => {
    setSelectedTopics([]);
    setSelectedLocations([]);
    setSelectedAudiences([]);
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
        updateAllLocations,
        resetAllFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
