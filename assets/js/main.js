const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 12
let offset = 0

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        pokemon =>
          `
          <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map(type => `<li class="type ${type}"> ${type}</li>`)
                .join(' ')}
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}">
            </div>
    
  `
      )
      .join('')
    pokemonList.innerHTML += newHtml //  const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  debugger
  const qtdRecordWithNextPage = offset + limit

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, limit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})
