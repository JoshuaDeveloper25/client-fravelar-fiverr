import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );

  return (
    <AppContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
