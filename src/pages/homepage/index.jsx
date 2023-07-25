import React, { useEffect, useState, useReducer } from "react";
import Search from "../../components/search";
import "./styles.css";
import RecipeItem from "../../components/recipe-items";
import FavoriateItems from "../../components/favoriate-items";
import { ToastContainer, toast } from "react-toastify";
const dummy = "my name Ajay";
const HomePage = () => {
  const initialState = {
    filteredValue: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "filterfavorites":
        return {
          ...state,
          filteredValue: action.value,
        };

      default:
        return state;
    }
  };
  const [loadingState, setLoadingState] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [fovoriates, setfovoriate] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDataFromChildComponent = (getData) => {
    setLoadingState(true);
    console.log(getData, "getDataFromChildComponent");

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=0b486e71c68f4b9c9a0e5430c2d4b447&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
      }
    }
    getRecipes();
  };
  const addToFovraite = (getParticularID) => {
    console.log(getParticularID, "getParticularID");

    let cpyFavoriate = [...fovoriates];
    const index = cpyFavoriate.findIndex(
      (item) => item.id === getParticularID.id
    );
    console.log(index, "index");
    if (index === -1) {
      cpyFavoriate.push(getParticularID);
      toast.success("Your item is added in your favoriate cart");
      setfovoriate(cpyFavoriate);
      localStorage.setItem("fovoriates", JSON.stringify(cpyFavoriate));
      window.scrollTo({ top: "0", behavior: "smooth" });
    } else {
      toast.warning("item is already present in your favoriate cart");
    }
  };
  console.log(loadingState, recipes, "test");

  useEffect(() => {
    const extraFavoritesFromLocalStroagePageLoad =
      JSON.parse(localStorage.getItem("fovoriates")) || [];
    setfovoriate(extraFavoritesFromLocalStroagePageLoad);
    console.log(extraFavoritesFromLocalStroagePageLoad, "extra");
  }, []);

  console.log(fovoriates, "fovoriates123");

  const removeFromFav = (getCurrentId) => {
    let cpyFavorites = [...fovoriates];
    cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrentId);
    setfovoriate(cpyFavorites);
    localStorage.setItem("fovoriates", JSON.stringify(cpyFavorites));
    toast.success("Removed your item in Favorite Cart");
  };

  const filteredFavorites =
    fovoriates && fovoriates.length > 0
      ? fovoriates.filter((item) =>
          item.title.toLowerCase().includes(state.filteredValue)
        )
      : [];

  return (
    <>
      <div className="home">
        <Search
          getDataFromChildComponent={getDataFromChildComponent}
          getDataToParentComponent={dummy}
        />

        <div className="favorites-wrapper">
          <h1 className="favorites-title">Favoriate</h1>.
          <div className="search-favorites">
            <input
              name="filterfavorites"
              placeholder="Filter favorites"
              value={state.filteredFavorites}
              onChange={(e) =>
                dispatch({ type: "filterfavorites", value: e.target.value })
              }
            />
          </div>
          <div className="favorites">
            {!filteredFavorites.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
                className="no"
              >
                No Favorites are found
              </div>
            )}

            {filteredFavorites && filteredFavorites.length > 0
              ? filteredFavorites.map((item) => (
                  <FavoriateItems
                    removeFromFav={() => removeFromFav(item.id)}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                  />
                ))
              : null}
          </div>
        </div>

        {loadingState && (
          <div className="loading"> Loading Recipes pl ease wait </div>
        )}
        <div className="items">
          {recipes && recipes.length > 0
            ? recipes.map((item) => (
                <RecipeItem
                  addToFovraite={() => addToFovraite(item)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : ""}
        </div>
        {!loadingState && !recipes.length && (
          <div className="no"> No Recipes are found </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default HomePage;
