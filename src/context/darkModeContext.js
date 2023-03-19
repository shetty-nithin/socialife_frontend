import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext()

export const DarkModeContextProvider = ({children}) => {
    // <App/> is the children
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );
    // when the application is started, there is nothing called darkMode in the
    // local storage, hence the value of the darkMode will be set to "false". 

    const toggle = () => {
        setDarkMode(!darkMode);
    }
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode]);

    return(
        <DarkModeContext.Provider value={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    )
}