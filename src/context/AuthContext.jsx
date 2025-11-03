import { createContext, useState, useEffect } from "react";
import API from "../api/axios"; // your configured axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount — check for existing token and validate it
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Attach token to axios for all future requests
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Verify token by calling your backend
      API.get("/auth/me")
        .then((res) => {
          setUser(res.data.data); // assuming backend returns user details
        })
        .catch(() => {
          // Token invalid or expired
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // When user logs in
  const login = async (token) => {
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data);
      localStorage.setItem("user",JSON.stringify(res.data.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  // Logout clears everything
  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // While verifying token on page load
  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
