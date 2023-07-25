import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";
const RecipeItem = (props) => {
  const { theme } = useContext(ThemeContext);

  console.log(props, "recipes");
  const { id, image, title, addToFovraite } = props;
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="no image" />
      </div>
      <p>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        onClick={addToFovraite}
      >
        Add to Favroite
      </button>
    </div>
  );
};

export default RecipeItem;
