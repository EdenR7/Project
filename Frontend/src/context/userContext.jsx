import { createContext, useEffect } from "react";

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

export function UserContextProvider() {
  const [user, setUser] = useState(null);
  const userToken = localStorage.getItem("userToken");

  async function loginUserContext() {}

  useEffect(() => {
    if (userToken) {
      console.log("Logged");
    }
  }, []);
}
