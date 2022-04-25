import React from "react";
import { Link } from "react-router-dom";

export default function PokemonList({ pokemon }) {
  console.log(pokemon);
  return (
    <div>
      {pokemon.map((pokemon, key) => (
        <Link to={"pokemon/" + pokemon.name}>
          <div key={key}>{pokemon.name}</div>
        </Link>
      ))}
    </div>
  );
}
