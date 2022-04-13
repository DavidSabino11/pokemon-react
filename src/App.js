/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        console.log(response)
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="app">
      <div className="title">
        <h1>Status Pokémon</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        ></input>
        <button onClick={searchPokemon}>Pesquisar Pokémon</button>
      </div>
      <div className="display">
        {!pokemonChosen ? (
          <h1> Por favor, escolha um Pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img}></img>
            <h3>Espécie: {pokemon.species}</h3>
            <h3>Tipo: {pokemon.type}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Ataque: {pokemon.attack}</h4>
            <h4>Defesa: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
