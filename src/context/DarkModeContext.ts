import { createContext } from "react";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () =>
    console.error("toggleDarkMode used outside DarkModeContextProvider"),
});

export default DarkModeContext;
