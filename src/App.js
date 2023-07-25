import React, { createContext, useState } from "react";
import "./App.css";
import HomePage from "./pages/homepage";
import ThemeButton from "./components/theme-button";
import "react-toastify/dist/ReactToastify.css";
export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? { backgroundColor: "green" } : {}}>
        <ThemeButton />
        <HomePage />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
