import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import PokemonList from "./PokemonList";
import axios from "axios";
import "./pokeball.css";
import Pagination from "./Pagination";
import "./app.css";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPageUrl, setnextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl).then((res) => {
      console.log(res.data);
      setLoading(false);
      setnextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results);
    });
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) {
    return (
      <div className="container">
        <div className="pokeball"></div>
      </div>
    );
  }

  return (
    <>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      <PokemonList pokemon={pokemon} /> {}
    </>
  );
}

function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState();
  const [pokemonTypes, setPokemonTypes] = useState();
  const [pokemonData, setPokemonData] = useState([]);
  const toArray = [];
  const [currentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  console.log(name);

  useEffect(() => {
    axios.get(currentPageUrl + name).then((res) => {
      console.log(res.data);
      toArray.push(res.data);
      setPokemonTypes(res.data.types.map((type) => type.type.name + "/"));
      setPokemonData(toArray);
      setPokemon(res.data.results);
    });
  }, [name]);

  return (
    <div>
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} alt="pokemon" />
            <div className="divTable">
              <div className="divTableBody">
                <h1>{name}</h1>

                <div className="divTableRow">
                  <div className="divTableCell">Type(s):</div>
                  <div className="divTableCell">{pokemonTypes}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height:</div>
                  <div className="divTableCell"> {data.height / 10} m</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight:</div>
                  <div className="divTableCell"> {data.weight / 10} kg</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Number of Battles</div>
                  <div className="divTableCell">{data.game_indices.length}</div>
                </div>
                <Link to="/">
                  <button>Back</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </>
  );
}

export default App;
