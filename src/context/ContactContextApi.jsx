import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
const ContactContextApi = createContext();
export const ContactApiProvider = ({ children }) => {
    const [contactData, setContactData] = useState({});
    const [faqData, setFaqData] = useState({});
    const [locationData, setLocationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/contact-us");
                const data = res.data.data;
                setContactData(data.contact_data);
                setFaqData(data.faq_data);
                setLocationData(data?.location_data);
            } catch (error) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <ContactContextApi.Provider value={{ contactData, faqData, locationData, loading, error }}>
            {children}
        </ContactContextApi.Provider>
    );
};
export const useApi = () => {
    return useContext(ContactContextApi);
};
