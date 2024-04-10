"use client";
import { useEffect, useState } from "react";
import { Pokedex } from "./interfaces";

export default function Home() {
  const [inputValue, setInputValue] = useState("pikachu");
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [pokemon, setPokemon] = useState<Pokedex | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPokemon(data as Pokedex))
      .catch((error) => setError(error.message));
  }, [pokemonName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const handleSearchClick = () => {
    setError("");
    setPokemonName(inputValue);
  };

  if (pokemon === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p>Loading...</p>
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <div className="flex">
            <input
              type="text"
              id="pokemonName"
              name="pokemonName"
              value={inputValue}
              placeholder="Search for a Pokemon"
              className="text-black p-2 rounded px-2 flex-grow"
              onChange={handleInputChange}
            />
            <button
              className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded ml-4"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          <p className="my-2 p-2 rounded border bg-gray-700 border-gray-500 text-gray-300 font-light">
            Bulbasaur, Charmander, Squirtle, Ekans, Meowth, Psyduck, Poliwag
          </p>
          {error && <p>Error: {error}</p>}
          <p className="text-4xl mt-8">{pokemon.name}</p>
          <div className="grid grid-cols-4 gap-4">
            <img src={pokemon.sprites.front_default} />
            <img src={pokemon.sprites.back_default} />
            <img src={pokemon.sprites.front_shiny} />
            <img src={pokemon.sprites.back_shiny} />
          </div>
          <p className="text-2xl mt-4">Height</p>
          <p>{pokemon.height}</p>
          <p className="text-2xl mt-4">Types</p>
          {pokemon.types.map((type, index) => (
            <p key={index}>{type.type.name}</p>
          ))}
          <p className="text-2xl mt-4">Abilities</p>
          {pokemon.abilities.map((ability, index) => (
            <p key={index}>{ability.ability.name}</p>
          ))}
          <p className="text-2xl mt-4">Moves</p>
          <div className="grid grid-cols-4 gap-4">
            {pokemon.moves.map((move, index) => (
              <p key={index}>{move.move.name}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
