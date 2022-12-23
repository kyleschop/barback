var drinkNameDisplay = document.getElementById("drinkName");
var ingredientListDisplay = document.getElementById("ingredientList");
var userInput = document.querySelector("#default-search");
var searchBtn = document.querySelector("#sbtBtn");
var searchHistoryArr = [];
var searchHistory = JSON.parse(localStorage.getItem('searchHistoryArr'));

function makeRandom(length) {
  var randomNum = Math.floor(Math.random() * length);
return randomNum;
}

function getApi(alcType){
    var drinkApi = "https://api.edamam.com/api/recipes/v2?type=public&q="+ alcType +"&app_id=35d6513c&app_key=1522b093a826cd1756220f536462ec8e&dishType=Drinks"
    fetch(drinkApi, {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    var randomNum = makeRandom(data.hits.length);
    var drink = {
        recipe: data.hits[randomNum].recipe.ingredientLines,
        name: data.hits[randomNum].recipe.label
    }
    displayDrink(drink);
    saveHistory(drink);
  });
};

function saveHistory(drink) {
  if(searchHistory === null) {
    searchHistoryArr = searchHistoryArr.concat(drink.name);
    localStorage.setItem('searchHistoryArr', JSON.stringify(searchHistoryArr));
  } else {
    searchHistoryArr = searchHistory;
    searchHistoryArr = searchHistoryArr.concat(drink.name);
    localStorage.setItem('searchHistoryArr', JSON.stringify(searchHistoryArr));
  };
};

function displayDrink(drink) {
  drinkNameDisplay.textContent = "";
  ingredientListDisplay.textContent = "";
  drinkNameDisplay.textContent = drink.name;
  for(var i = 0; i < drink.recipe.length; i++) {
    var recipeItem = document.createElement("li");
    recipeItem.textContent = drink.recipe[i];
    ingredientListDisplay.appendChild(recipeItem);
  }
};

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    var alcType = userInput.value.trim();
    getApi(alcType);
});