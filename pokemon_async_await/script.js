const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
const outputDiv = document.getElementById("output");

const getAllPokemon = async () => {
  try {
      const response = await fetch(POKEMON_API_URL);
      const data = await response.json();
      console.log("All Pokemon data:", data.results);
      return data.results;
  } catch (error) {
      console.error("Error fetching all Pokemon:", error);
  }
};


const displayThreeRandomPokemonDetails = async () => {
    try {
        const pokemons = await getAllPokemon();
        const randomIndices = [];
        while (randomIndices.length < 3) {
            let rnd = Math.floor(Math.random() * pokemons.length);
            if (!randomIndices.includes(rnd)) randomIndices.push(rnd);
        }
        const randomPokemons = randomIndices.map(index => pokemons[index]);
        const pokemonData = await Promise.all(randomPokemons.map(async pokemon => {
            const response = await fetch(pokemon.url);
            return response.json();
        }));
        pokemonData.forEach(pd => {
            displayOnWebpage(pd.name, pd.sprites.front_default, "");
        });
        return pokemonData;
    } catch (error) {
        console.error("Fetching random Pokemon...", error);
    }
};

const displaySpeciesDescription = async () => {
    try {
        const pokemons = await displayThreeRandomPokemonDetails();
        const speciesData = await Promise.all(pokemons.map(async pokemon => {
            const response = await fetch(pokemon.species.url);
            return response.json();
        }));
        speciesData.forEach((species, index) => {
            const flavorTextEntry = species.flavor_text_entries.find(entry => entry.language.name === "en");
            if (flavorTextEntry) {
                const existingDiv = document.querySelector(`[data-pokemon-name="${species.name}"]`);
                if (existingDiv) {
                    const pokemonDesc = document.createElement("p");
                    pokemonDesc.textContent = flavorTextEntry.flavor_text;
                    existingDiv.appendChild(pokemonDesc);
                }
            }
        });
    } catch (error) {
        console.error("Error fetching Pokemon species description:", error);
    }
};

const displayOnWebpage = (name, imageUrl, description) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.setAttribute("data-pokemon-name", name);  // Set a data attribute for the Pokémon's name

  const pokemonName = document.createElement("h2");
  const pokemonImage = new Image();
  const pokemonDesc = document.createElement("p");

  pokemonName.textContent = name;
  pokemonImage.src = imageUrl;
  pokemonDesc.textContent = description;

  pokemonDiv.appendChild(pokemonName);
  pokemonDiv.appendChild(pokemonImage);
  pokemonDiv.appendChild(pokemonDesc);
  
  outputDiv.appendChild(pokemonDiv);
}


document.addEventListener("DOMContentLoaded", function() {
  const outputDiv = document.getElementById("output");
  const randomPokemonBtn = document.getElementById("randomPokemonBtn");
  const pokemonDescBtn = document.getElementById("pokemonDescBtn");

  randomPokemonBtn.addEventListener("click", () => {
      console.log("Random Pokemon button clicked!");
      displayThreeRandomPokemonDetails();
  });
  
  pokemonDescBtn.addEventListener("click", displaySpeciesDescription);
});


