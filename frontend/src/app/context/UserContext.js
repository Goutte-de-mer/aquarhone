"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
const API_URL = "http://localhost:8000/api/users";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  function login(userData) {
    setUser(userData);
  }
  function logout() {
    const logoutUser = async () => {
      await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
    };
    logoutUser();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export const useAuth = () => useContext(UserContext);
