import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const USER_BASE_URL = "http://localhost:3000/api/user";

export const UserContext = createContext({
  user: {
    userId: "",
    username: "",
    email: "",
  },
  setUser: () => {},
  loginUserContext: () => {},
  logoutUser: () => {},
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  async function loginUserContext(token) {
    try {
      const res = await axios.get(USER_BASE_URL, {
        headers: {
          Authorization: token,
        },
      });
      const { data: newUser } = res;
      setUser(newUser);
    } catch (err) {
      console.error(err);
    }
  }
  async function logoutUser() {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate("/");
  }

  useEffect(() => {
    if (userToken) {
      loginUserContext(userToken);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, userToken, setUser, loginUserContext, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

// import api from "@/services/api.service";
// import { useLocalStorage } from "@uidotdev/usehooks";
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext({
//   loggedInUser: { userId: "", username: "", email: "" },
//   login: () => {},
//   register: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState(undefined);
//   const [token, setToken] = useLocalStorage("userToken", null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       setLoggedInUser(null);
//       return;
//     }

//     async function fetchUser() {
//       try {
//         const response = await api.get("/auth/loggedInUser");
//         setLoggedInUser(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           console.error("Invalid token, logging out");
//           logout();
//         } else if (error.response?.status === 404) {
//           console.error("User not found, logging out");
//           logout();
//         } else {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     }

//     fetchUser();
//   }, [token]);

//   function logout() {
//     setToken(null);
//     setLoggedInUser(null);
//   }

//   async function login(userData) {
//     try {
//       const response = await api.post("/auth/login", userData);
//       setToken(response.data.token);
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   }

//   async function register(userData) {
//     try {
//       const response = await api.post("/auth/register", userData);
//     } catch (error) {
//       console.error("Error registering:", error);
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within a UserProvider");
//   }
//   return context;
// }
