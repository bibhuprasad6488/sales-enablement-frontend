import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "../api/axios";
const WebsiteContextApi = createContext();
export const WebsiteApiProvider = ({ children }) => {
    const [websiteData, setWebsiteData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/get-website-data");
                setWebsiteData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const contextValue = useMemo(() => ({ websiteData, loading, error }), [websiteData, loading, error]);
    return (
        <WebsiteContextApi.Provider value={contextValue}>
            {children}
        </WebsiteContextApi.Provider>
    );
};
export const useApi3 = () => useContext(WebsiteContextApi);
