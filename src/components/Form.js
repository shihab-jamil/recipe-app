import React, { useState, useEffect, useContext } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";

function Form(props) {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(undefined);
  const [recipes, setRecipes] = useState([]);

  const APP_ID = "c8ffb17d";
  const APP_KEY = "7e680ae1ad2f231342a68d9444c4f103";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(input);
    setInput("");
  };

  useEffect(() => {
    getRecipe();
    props.addRecipes(recipes);
  }, [query]);

  const getRecipe = () => {
    if (query != "") {
      axios
        .get(url)
        .then((response) => {
          setRecipes(response.data.hits);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <form className="row my-5">
        <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
          <input
            className="input w-100 mb-2"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12 text-center">
          <button
            type="submit"
            disabled={!input}
            className="btn btn-success"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
