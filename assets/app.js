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
    <a class="navbar-brand text-center" href="#">\
      <img src="place-holder.png" width="30" height="30" alt="logo">\
    </a>\
    <div class="container-fluid text-center p-2 m-2 tasty-header">\
      <h1 class=" mb-0">Tasty Facts</h1>\
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
$('#search').on('click', function() {
  let country = $('#country').val();
  getCountryData(country, updateUI);
});

function updateUI(data) {
  // Use the data as needed
  console.log(data);
}

// //function to create dropdown list (ANNA)
// var favList = JSON.parse(localStorage.getItem("My favorites")) || [];

// function renderDropdownList() {

//   favList.empty();

//   for (var i = 0; i < favList.length; i++) {

//       var newFavBtn = $("<button>");
//       newHistoryButton.text(favList[i]);
//       newHistoryButton.addClass("dropdown-menu show");

//       favList.append(newFavBtn);
//   }

// };

// //function for click event for favorites recipies in the downdrop list(ANNA)
// favList.on("click", "button", function (event) {
//   var buttonName = $(event.target).text();
//           //function to display favorite recipe (buttonName)
//       });