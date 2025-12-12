import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Sign Up");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSetActiveTab = (tabName) => {
    setActiveTab(tabName);
  };

  // ✅ Sync tab when coming from NavLink with state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const handlePopState = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
<<<<<<< HEAD
    <TabContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
=======
    <TabContext.Provider
      value={{ activeTab, setActiveTab: handleSetActiveTab }}
    >
>>>>>>> b5a8da09364cc726f4e394da8eb0c32802ac5400
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);
