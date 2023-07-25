import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./styles.css";
const Search = (props) => {
  console.log(props);
  const { getDataFromChildComponent } = props;
  const [inputValue, setInputValue] = useState("");
  const handleInputValue = (e) => {
    const { value } = e.target;
    setInputValue(value);
    //setInputValue(e.target.value)
  };

  console.log(inputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      toast.success("Thanks for your Input Data");
      getDataFromChildComponent(inputValue);
      setInputValue("");
    } else {
      toast.error("Please Enter Word in Search Field");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="search"
          onChange={handleInputValue}
          value={inputValue}
          id="search"
          placeholder="Search Recipes"
        />
        <button type="submit">Search recipes</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Search;
