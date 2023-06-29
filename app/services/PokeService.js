import { AppState } from "../AppState.js";
import { Poke } from "../models/Poke.js";
import { api, pokeApi } from "./AxiosService.js";

class PokeService {
  getMyActivePokemon(pokeId) {
    console.log(pokeId)
    let pokemon = AppState.myPokemonList
    let foundPokemon = pokemon.find(p => p.id == pokeId)
    AppState.activePokemon = foundPokemon
    AppState.emit('activePokemon')
  }

  async getPokemon() {
    const res = await pokeApi.get('/api/v2/pokemon/')
    console.log(res.data)
    AppState.pokemonList = res.data.results
    console.log(AppState.pokemonList)
  }
  async getActivePokemon(pokeName) {
    let pokemonList = AppState.pokemonList
    let foundPokemon = pokemonList.find(p => p.name == pokeName)
    const res = await pokeApi.get(foundPokemon.url)
    let activePokemon = AppState.activePokemon
    console.log(res.data)
    AppState.activePokemon = new Poke(res.data)
    console.log(AppState.activePokemon)
    AppState.emit('activePokemon')
  }

  async catchPokemon() {
    let activePokemon = AppState.activePokemon
    const res = await api.post('/api/pokemon', activePokemon)
    AppState.myPokemonList.push(new Poke(res.data))
    AppState.emit('myPokemonList')
    console.log(res.data)
  }

  async getMyPokemon() {
    const res = await api.get('/api/pokemon')
    console.log(res.data)
    const builtPokemon = res.data.map(pokePojo => new Poke(pokePojo))
    AppState.myPokemonList = builtPokemon
    AppState.emit('myPokemonList')
  }


}
export const pokeService = new PokeService();