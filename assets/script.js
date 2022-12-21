

var userInput = document.querySelector("#default-search");
var searchBtn = document.querySelector("#sbtBtn");


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
    console.log(data)
    var drink = {
        recipe: data.hits[0].recipe.ingredientLines,
        name: data.hits[0].recipe.label
    }
    console.log(drink.recipe);
    console.log(drink.name);
  });

}


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    var alcType = userInput.value.trim();
    console.log(alcType);
    getApi(alcType);
})
 