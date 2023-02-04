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
// Event listener for the search button
$('#search').on('click', function () {
  country = $('#country').val();
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


// seacrch by map with country parameters
function searcheByCountry(country) {
  //show modal window
  $("#exampleModal").modal('show');
  //get country data request
  getCountryData(country, function (data) {
    // coutry information block
    createCountryInformationConteiner(data, country);
  });

  //get recepies request
  getRecipeData(country, function (data) {
    console.log(data);
    createRecepiesConteiner(data)
  });
}


//displais country information conteiner
function createCountryInformationConteiner(data, country) {
  console.log(data[0])
  $("#exampleModalLabel").text(country);

  var rowEl = $("<div>");
  rowEl.addClass("row");

  var secondRowEl = $("<div>");
  secondRowEl.addClass("cards");

  var infoEl = $("<div>");
  infoEl.addClass("col-6");
  var flagWrapperEl = $("<div>");
  flagWrapperEl.addClass("col-6");

  var imgEl = $("<img/>");
  imgEl.attr("alt", data[0].capital[0]);
  imgEl.attr("src", data[0].flags.png);
  imgEl.attr("style", "height: 100px; float: right");

  var capitalEl = $("<p>Capital: " + data[0].capital[0] + " </p>");
  var regionEl = $("<p>Region: " + data[0].region + " </p>");
  var currenciesEl = $("<p>Currencies: " + data[0].currencies.DKK.name  + " </p>");

  infoEl.append(capitalEl);
  infoEl.append(regionEl);
  infoEl.append(currenciesEl);

  flagWrapperEl.append(imgEl);

  rowEl.append(infoEl);
  rowEl.append(flagWrapperEl);
  $(".modal-body").prepend(rowEl);
  $(".modal-body").append(secondRowEl);
}

function createRecepiesConteiner(data) {
  data.hits.forEach((element, index) => {
    console.log(element.recipe)
    console.log(index)
    if(index < 3){
      var cardEl = $("<div>");
      cardEl.addClass("card");
      cardEl.attr("style", "width: 18rem;");


      var imgEl = $("<img>");
      imgEl.attr("alt", element.recipe.label);
      imgEl.addClass("card-img-top");
      imgEl.attr("src", element.recipe.image);

      var cardBodyEl = $("<div>");
      cardBodyEl.addClass("card-body");

      var h5El = $("<h5>");
      h5El.addClass("card-title");
      var pEl = $("<p>");
      pEl.addClass("card-text");
      pEl.text(
        "dishTyp: " +  element.recipe.dishTyp.join() +
        "cautions: " + element.recipe.cautions.join(", ")
      );
      var aEl = $("<a>");
      aEl.addClass("btn btn-primary");
      aEl.text("add to favorite");

      cardEl.append(imgEl);
      cardEl.append(cardBodyEl);
      cardBodyEl.append(h5El);
      cardBodyEl.append(pEl);
      cardBodyEl.append(aEl);
      $(".cards").append(cardEl);
    }
  });

}



