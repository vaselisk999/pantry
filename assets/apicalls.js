// callback function to fetch data from the API usoing the country name from app.js
function getCountryFacts(country) {
    fetch(
      `https://restcountries.eu/rest/v3.1/name/${country}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Call function to display country facts
        displayCountryFacts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


