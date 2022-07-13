let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    // Other functions remain here
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      const pokemonList = document.querySelector(".pokemon-list");
      const listPokemon = document.createElement("li");
      const container = document.querySelector(".container");
      const button = document.createElement("button");
      button.classList.add('button-class')
      listPokemon.classList.add('list')
      listPokemon.appendChild(button)
      button.innerText = pokemon.name;
      pokemonList.appendChild(listPokemon);
      container.appendChild(pokemonList);
      button.addEventListener("click", function (event) {
        showDetails(pokemon)
      });
  
    };
  
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    };
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    };
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    };
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  