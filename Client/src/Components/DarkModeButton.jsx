import React, { useEffect, useState } from "react";
import { ThemeContextProvider } from "../Context/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
function DarkModeButton() {
  const [themeMode, setThemeMode] = useState("light");

  function lightMode() {
    setThemeMode("light");
  }
  function darkMode() {
    setThemeMode("dark");
  }

  function changeThemeValue(e) {

    if(themeMode == 'light'){
      setThemeMode("dark")
    }
    else{
      setThemeMode("light")
      
    }
  }
  useEffect(() => {
    document.querySelector("html").classList.remove("light");
    document.querySelector("html").classList.remove("dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeContextProvider value={{ themeMode, lightMode, darkMode }}>
      <div className="transition-colors duration-150">
        
        <button className="border cursor-pointer flex justify-center items-center rounded-full w-10 h-10" style={{backgroundColor : themeMode == "light" ? "#FDC700" : "#4F39F6" }} onClick={changeThemeValue}> {themeMode === "light" ? (
          <FontAwesomeIcon className="text-2xl text-black" icon={faMoon} />
        ) : (
          <FontAwesomeIcon className="text-white text-2xl" icon={faSun} />
        )}</button>
      </div>    
    </ThemeContextProvider>
  );
}

export default DarkModeButton;
