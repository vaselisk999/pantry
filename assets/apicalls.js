async function getCountryData(country, callback) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await response.json();
      callback(data);
    } catch (error) {
      console.error(error);
    }
  }
  


