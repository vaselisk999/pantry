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
async function getRecipeData(country, callback) {
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${country}`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
}
