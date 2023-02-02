// for the html file:
// 1. use bootsrap
// 2. create a map and make it clickable
// 3. create popup
// 4. integrate API country facts
// 5. integrate API developer EDAMAM
// 6. create structure for pop up (what should be displayed inside)
// country name, how many recipes we want to be shown
// 7. create cool logo for header
// 8. create dropdown menu with saved recipes
// 9. Use the MealDB API


// Global variables
// -----------------------------------------------
// Variable for searched country
let country;
//-----------------------------------------------
// Header/Navbar with logo
$(document).ready(function () {
  var header = $("#header");
  header.append(
    '<nav class=" navbar-expand-lg navbar-light  d-flex justify-content-center">\
    <a class="navbar-brand text-center" href="#">\
      <img src="place-holder.png" width="30" height="30" alt="logo">\
    </a>\
    <div class="container-fluid text-center p-2 m-2 tasty-header">\
      <h1 class=" mb-0">Tasty Facts</h1>\
    </div>\
  </nav>'
  );
});

//-----------------------------------------------
// Event listener for the search button
$('#search').on('click', function() {
  country = $('#country').val();
  getCountryData(country, function(data) {
  updateUI(data);
  });
  
  getRecipeData(country, function(data) {
  updateUI(data);
  });
  });
  
  // Function to update the UI with the data
  function updateUI(data) {
  console.log(data);
  }