import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Card from "./components/Card";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(undefined);
  const [recipes, setRecipes] = useState([]);
  const [done, setDone] = useState(undefined);

  function makeId(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

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
  }, [query]);

  const getRecipe = () => {
    if (query != undefined) {
      axios
        .get(url)
        .then((response) => {
          setRecipes(response.data.hits);
          setDone(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Please input something to search recipes");
    }
  };

  return (
    <div className="App">
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

      <div className="row my-2 justify-content-center">
        {!done ? (
          <p>Loading...</p>
        ) : (
          recipes.map((recipe, index) => (
            <Card key={index} recipe={recipe} id={makeId(6)} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
