// src/Context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("Theme");
      if (saved !== null) setTheme(JSON.parse(saved));
    })();
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
