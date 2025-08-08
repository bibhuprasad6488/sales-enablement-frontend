import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
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
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.reload();
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
