import React ,{createContext, useContext} from "react";

export const themeContext = createContext({
        themeMode : "dark", 
        lightMode : () =>{}, 
        darkMode : () =>{}
    })


export const ThemeContextProvider = themeContext.Provider;


export const useTheme = () =>{
    return useContext(themeContext)
} // custom hook for reciving data 

