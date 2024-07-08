import api from "@/services/api.service";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "./SnackBarContext";
const USER_BASE_URL = "/user";

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
  const { displaySnackBar } = useContext(SnackBarContext);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  async function loginUserContext() {
    try {
      const res = await api.get(USER_BASE_URL);
      const { data: newUser } = res;
      setUser(newUser);
    } catch (err) {
      console.error(err);
    }
  }
  async function logoutUser() {
    setUser(null);
    displaySnackBar({
      label: "Sign Out successfully",
    });
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
