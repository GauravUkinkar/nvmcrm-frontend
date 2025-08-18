import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    console.log(user, "user")
  const getUser = async (id, token, role) => {
    try {
      let response;

      if (role === "ADMIN") {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}admin/getEmployee/eId?eId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "EMPLOYEE") {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}user/getEmployee/eId?eId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const eid = localStorage.getItem("eid");
    const role = localStorage.getItem("role");

    if (token && eid && role) {
      getUser(eid, token, role);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
