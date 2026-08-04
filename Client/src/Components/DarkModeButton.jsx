import React, { useEffect, useState } from "react";
import { ThemeContextProvider } from "../Context/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
function DarkModeButton() {
  const [themeMode, setThemeMode] = useState("dark");

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
        
        <button className=" cursor-pointer bg-[#4F39F6] flex justify-center items-center rounded-full w-9 h-9"  onClick={changeThemeValue}> {themeMode === "light" ? (
          <FontAwesomeIcon className="text-xl text-white" icon={faMoon} />
        ) : (
          <FontAwesomeIcon className="text-white text-xl" icon={faSun} />
        )}</button>
      </div>    
    </ThemeContextProvider>
  );
}

export default DarkModeButton;
