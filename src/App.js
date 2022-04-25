import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import PokemonList from "./PokemonList";
import axios from "axios";
import "./pokeball.css";
import Pagination from "./Pagination";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
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
      <div class="container">
        <div class="pokeball"></div>
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
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  console.log(name);

  useEffect(() => {
    axios.get(currentPageUrl + name).then((res) => {
      console.log(res.data);

      setPokemon(res.data.results);
    });
  }, [name]);

  return (
    <>
      <h1>{name}</h1>
      <h2>{types[0]}</h2>
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </>
  );
}

export default App;
