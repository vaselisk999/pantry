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
// Header/Navbar with logo and dropdown
$(document).ready(function () {
  var header = $("#header");
  header.append(
    '<nav class=" navbar-expand-lg navbar-light  d-flex justify-content-center">\
    <div class="container-fluid tasty-header">\
      <div class="title-icon-wrap">\
        <h2 class="title-style">Tasty</h2>\
        <img src="images/header-icon.png" id="header-icon"alt="logo">\
        <h2 class="title-style">Facts</h2>\
      </div>\
    </div>\
    <div class="dropdown">\
      <button id = "dropdown-btn" class=" btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">\
        My favorites\
      </button>\
      <div class="dropdown-menu">\
        <button class="dropdown-item" type="button">Action</button>\
      </div>\
    </div>\
  </nav>'
  );
});

//-----------------------------------------------
// Event listener for the search button
$('#search').on('click', function () {
  country = $('#country').val();
  searchApiObj.searcheByCountry(country);
  getCountryData(country, function (data) {
    updateUI(data);
  });
  // 
  getRecipeData(country, function (data) {
    updateUI(data);
  });

  $("#exampleModal").modal('show');
  $("#exampleModalLabel").text(country);
});

// Function to update the UI with the data

function updateUI(data) {
  
  let countryData = data[0];
  console.log(countryData);
  // Update the modal with the data
  $('#writing-space').html(`
    <img class="flag"src="${countryData.flags.svg}">
    
    <p>Capital: ${countryData.capital[0]}</p>
    <p>Population: ${countryData.population}</p>
    <p>Region: ${countryData.region}</p>

  `);
}

// function to add recipes

var addToFavoriteBtn = $(".addToFavBtn");
var recipeCardTitle = $(".card-title");
$(".card-body").on("click", "button", function (event) {

event.preventDefault();

var recipeName = $(event.target);
favList.push(recipeName);
localStorage.setItem("My favorites", JSON.stringify(recipeName));
//localStorage.setItem("My Favorites", JSON.stringify(favList));
renderDropdownList();

});

var favList = JSON.parse(localStorage.getItem("My favorites")) || [];

var dropdownList = $(".downdrop-menu");

function renderDropdownList() {

  dropdownList.empty();

  for (var i = 0; i < favList.length; i++) {

      var newFavBtn = $("<button>");
      newFavBtn.text(favList[i]);
      newFavBtn.addClass("dropdown-item");
      newFavBtn.attr("type", "button");

      dropdownList.append(newFavBtn);
    }

  };
  





// //function for click event for favorites recipies in the downdrop list(ANNA)
// favList.on("click", "button", function (event) {
//   var buttonName = $(event.target).text();
//           //function to display favorite recipe (buttonName)
//       });

//Function for modal//

// $('#exampleModal').on('show.bs.modal', function (event) {             // we need to start using real #ids and classes for the elements, exampleModal, whatever,etc make it hard to keep working on the code.
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })

//class SearchApiClass




var searchApiObj = {
  searcheByCountry: function (country) {
    getCountryData(country, function (data) {
      updateUI(data);

      $("#exampleModal").modal('show');
      $("#exampleModalLabel").text(country);
    });
  }
}




