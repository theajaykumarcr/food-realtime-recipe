import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const FavoriateItems = (props) => {
  const { theme } = useContext(ThemeContext);

  console.log(props, "recipes");
  const { id, image, title, removeFromFav } = props;
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="no image" />
      </div>
      <p>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        onClick={removeFromFav}
      >
        Remove from FavoriateItems
      </button>
    </div>
  );
};

export default FavoriateItems;
