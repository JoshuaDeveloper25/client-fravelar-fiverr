import axios from "axios";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );

  axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo?.token}`;

  console.log(userInfo)
  return (
    <AppContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
