import { AppState } from "../AppState.js";
import { pokeService } from "../services/PokeService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawMyList() {
  let template = ''
  let myPokemonList = AppState.myPokemonList
  myPokemonList.forEach(p => template += p.myPokemonListTemplate)
  setHTML('myPokeList', template)
}

function _drawList() {
  let template = ''
  let pokemonList = AppState.pokemonList
  pokemonList.forEach(p => {
    template += `<li onclick= "app.PokeDexController.getActivePokemon('${p.name}')" class= "selectable"> ${p.name} </li>`
  })
  setHTML('pokeList', template)
}

function _drawActive() {

  let activePokemon = AppState.activePokemon
  if (!activePokemon) {
    console.log(activePokemon)
    console.log('dont draw')
    return
  }


  setHTML('pokeActiveView', activePokemon.pokeActiveTemplate)

}

export class PokeDexController {
  constructor() {
    console.log('poke controller');

    this.getPokemon()
    AppState.on('pokemonList', _drawList)
    AppState.on('activePokemon', _drawActive)
    AppState.on('myPokemonList', _drawMyList)
    AppState.on('account', this.getMyPokemon)
  }

  getMyActivePokemon(pokeId) {
    console.log(pokeId)
    pokeService.getMyActivePokemon(pokeId)
  }

  async getPokemon() {
    try {
      await pokeService.getPokemon()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)

    }
  }

  async getActivePokemon(pokeName) {
    try {
      await pokeService.getActivePokemon(pokeName)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async catchPokemon() {
    try {
      await pokeService.catchPokemon()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async getMyPokemon() {
    try {
      await pokeService.getMyPokemon()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}