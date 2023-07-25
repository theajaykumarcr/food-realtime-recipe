import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";
const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        className="toggle"
        onClick={() => setTheme(!theme)}
      >
        Change Theme
      </button>
    </>
  );
};

export default ThemeButton;
