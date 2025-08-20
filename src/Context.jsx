import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
const [user, setUser] = useState(null);


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

      setUser(response.data.data || false);
    } catch (error) {
      console.log(error);
       setUser(false); 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const eid = localStorage.getItem("eid");
    const role = localStorage.getItem("role");

    if (token && eid && role) {
      getUser(eid, token, role);
    }else {
    setUser(false); // 👈 if no credentials in localStorage
  }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
