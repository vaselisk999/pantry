// Description: This file contains all the API calls for the application

// Function to get country data from restcountries API

async function getCountryData(country, callback) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
}
// Function to get recipe data from spoonacular API
function getRecipeData(searchQuery) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": X_RapidAPI_Key,
      "X-RapidAPI-Host": X_RapidAPI_Host,
    },
  };

  return fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchQuery}`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
