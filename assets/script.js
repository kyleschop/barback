//saves the drink name header to a variable
var drinkNameDisplay = document.getElementById("drinkName");
//saves ingredient list to a variable
var ingredientListDisplay = document.getElementById("ingredientList");
//saves the input to a variable
var userInput = document.querySelector("#default-search");
//saves search button to a variable
var searchBtn = document.querySelector("#sbtBtn");
//saves search history array to global scope
var searchHistoryArr = [];
//pull data from local storage
var searchHistory = JSON.parse(localStorage.getItem('searchHistoryArr'));
//saves list for search history to variable
var historyList = document.querySelector("#historyList");

//function creates a random number based on the length sent to it
function makeRandom(length) {
  var randomNum = Math.floor(Math.random() * length);
return randomNum;
}

//gets api data based on the user input used in search bar
function getApi(alcType){
    var drinkApi = "https://api.edamam.com/api/recipes/v2?type=public&q="+ alcType +"&app_id=35d6513c&app_key=1522b093a826cd1756220f536462ec8e&dishType=Drinks"
    fetch(drinkApi, {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    //makes a random number based on the length of the array
    var randomNum = makeRandom(data.hits.length);
    //displays a message saying there is no results if there is no data in the array 
      if(data.hits.length === 0) {
        drinkNameDisplay.textContent = "";
        ingredientListDisplay.textContent = "";
        drinkNameDisplay.textContent = "No Results Found. Please try another search";
      } else {
        //assigns a random drink from the array to an object with the ingredients
        var drink = {
            recipe: data.hits[randomNum].recipe.ingredientLines,
            name: data.hits[randomNum].recipe.label
        }
        displayDrink(drink);
        saveHistory(drink);
        addHistory();
      }
  });
};

//function saves the drink name of every search to local storage 
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

//adds drink name and ingredients to html
function displayDrink(drink) {
  drinkNameDisplay.textContent = "";
  ingredientListDisplay.textContent = "";
  drinkNameDisplay.textContent = drink.name;
  //adds all ingredients in array to html
  for(var i = 0; i < drink.recipe.length; i++) {
    var recipeItem = document.createElement("li");
    recipeItem.textContent = drink.recipe[i];
    ingredientListDisplay.appendChild(recipeItem);
  }
};

//adds the drink names from local storage to html
function addHistory() {

  historyList.textContent = "";
  var lastDrinks = JSON.parse(localStorage.getItem('searchHistoryArr'));
  if(lastDrinks !== null) {
    for(i = 0; i < lastDrinks.length; i++) {
      var historyItem = document.createElement("li");
      historyItem.textContent = lastDrinks[i];
      historyList.appendChild(historyItem);
    }
    //returns nothing if there is nothing in local starge
  } else {
    return;
  }
};

//event listener for the search button
searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    //saves the user input to variable
    var alcType = userInput.value.trim();
    getApi(alcType);
});

//adds previous drinks searched from the local storage when the page is 1st loaded if there is anything saved to it
addHistory();