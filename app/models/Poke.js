export class Poke {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name
    this.nickName = data.name
    // FIXME this might cause issues
    this.img = data.img || data.sprites.front_default
    this.weight = data.weight
    this.height = data.height
    // this should be fine
    this.types = data.types
  }
  // static get pokeListTemplate() {
  //   return `<li onclick= "app.PokeDexController.getActivePokemon('${this.name}')" class= "selectable"> ${this.name} </li>`
  // }

  get myPokemonListTemplate() {
    return `
    <li onclick= "app.PokeDexController.getMyActivePokemon('${this.id}')" class= "selectable"> ${this.name} </li>
    `
  }

  get myPokeActiveTemplate() {
    return `
    <div class="card pb-5 px-5 flex flex-column align-items-center elevation-5">
      <img src="${this.img}" class="card-img-top img-fluid" alt="${this.name}" >
      <div class="d-flex flex-column align-items-center">
        <h4 >${this.name}</h4>
        <p >${this.name}</p>
        <h5  >${this.computeType}</h5>
        <h6 ><span>Weight: ${this.weight}</span>  <span>Height: ${this.height}</span></h6>
      </div>
    </div>
    `
  }

  get pokeActiveTemplate() {
    return `
    <div class="card pb-5 px-5 flex flex-column align-items-center elevation-5">
      <img src="${this.img}" class="card-img-top img-fluid" alt="${this.name}" >
      <div class="d-flex flex-column align-items-center">
        <h4 >${this.name}</h4>
        <p >${this.name}</p>
        <h5  >${this.computeType}</h5>
        <h6 ><span>Weight: ${this.weight}</span>  <span>Height: ${this.height}</span></h6>
        <button onclick="app.PokeDexController.catchPokemon()" class="btn btn-primary">Catch</button>
      </div>
    </div>
    `
  }

  get computeType() {
    let template = ''
    this.types.forEach(t => template += t.type.name + ' ')
    return template
  }


}

// const pokeData = {
//   {
//   "name": {
//     "type": "String",
//       "required": true
//   },
//   "nickName": {
//     "type": "String"
//   },
//   "img": {
//     "type": "String",
//       "required": true
//   },
//   "weight": {
//     "type": "String"
//   },
//   "height": {
//     "type": "String"
//   },
//   "types": [
//     {}
//   ],
//     "creatorId": {
//     "type": "ObjectId",
//       "required": true,
//         "ref": "Account"
//   }
// }
// }