import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
const CourseContextApi = createContext();
export const CourseApiProvider = ({ children }) => {
    const [courseData, setCourseData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("/courses");
                const data = res.data.data;
             
                setCourseData(data);
            } catch (error) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <CourseContextApi.Provider value={{ courseData, loading, error }}>
            {children}
        </CourseContextApi.Provider>
    );
};
export const useApi2 = () => {
    return useContext(CourseContextApi);
};
