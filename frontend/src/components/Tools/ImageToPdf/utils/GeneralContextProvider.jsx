import { useState, createContext } from "react";

export const GeneralContext = createContext();

// eslint-disable-next-line react/prop-types
const GeneralContextProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [popup, setPopup] = useState({ show: false, message: "", timeout: 0 });

  return (
    <GeneralContext.Provider value={{ files, setFiles, popup, setPopup }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
