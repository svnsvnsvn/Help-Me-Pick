import React, { createContext, useState, useEffect, useContext } from "react";
import themes from "./themes"; 
// import { updateWheelColors } from "./utils";

export const ThemeContext = createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
  };
  
export const ThemeProvider = ({ children, setSegments }) => {
  const [theme, setTheme] = useState("default"); // Default theme

  useEffect(() => {
    const themeVariables = themes["default"];
    for (const variable in themeVariables) {
        document.documentElement.style.setProperty(variable, themeVariables[variable]);
    }
    console.log("Initial theme applied:", themes["default"]);
}, []);


  const switchTheme = (newTheme) => {
    const themeVariables = themes[newTheme] || themes.default;
    for (const variable in themeVariables) {
      document.documentElement.style.setProperty(variable, themeVariables[variable]);
    }
    console.log("Switched to theme:", newTheme, themeVariables);
    setTheme(newTheme);

    return themes[newTheme]?.wheelColors || themes.default.wheelColors;

  };

  

  return (
<ThemeContext.Provider value={{ currentTheme: themes[theme], switchTheme }}>
            {children}
        </ThemeContext.Provider>
  );
};
