
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("Sign Up");
    const navigate = useNavigate();

    const handleSetActiveTab = (tabName) => {
        setActiveTab(tabName);
        const newPath = `/${tabName.toLowerCase().replace(/\s+/g, "-")}`;
        window.history.pushState(null, "", newPath);
    };

    useEffect(() => {
        const handlePopState = () => {
            navigate("/");
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [navigate]);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTab = () => useContext(TabContext);
