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
