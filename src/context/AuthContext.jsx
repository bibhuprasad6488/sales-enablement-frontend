import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }
  }, []);
  const idleTimerRef = useRef(null);
  const logout = () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      logout();
    }, 30 * 24 * 60 * 1000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    resetIdleTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    resetIdleTimer(); // restart timer when logged in
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
