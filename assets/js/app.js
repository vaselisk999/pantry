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
  searcheByCountry(country);
  getCountryData(country, function (data) {
    createCountryInformationConteiner(data);
    getRecipeData(country, function (data) {
      createRecepiesConteiner(data);
      console.log(data);
    });
  });
  // 


  $("#exampleModal").modal('show');
  $("#exampleModalLabel").text(country);
});
//-----------------------------------------------
// fucntion to populate cards with recipes from API
function updateCardInformation(getData, country) {
  getData(country, (data) => {
    let recipes = data.hits;
    let recipe1 = recipes[0].recipe;
    let recipe2 = recipes[1].recipe;
    let recipe3 = recipes[2].recipe;

    let cards = document.querySelectorAll(".card");
    cards[0].querySelector(".card-img-top").setAttribute("src", recipe1.img);
    cards[0].querySelector(".card-body").innerHTML = `
      <h5 class="card-title">${recipe1.title}</h5>
      <p class="card-text">${recipe1.description}</p>
      <button class="btn btn-primary addToFavBtn">Add to Favourites</button>
    `;

    cards[1].querySelector(".card-img-top").setAttribute("src", recipe2.img);
    cards[1].querySelector(".card-body").innerHTML = `
      <h5 class="card-title">${recipe2.title}</h5>
      <p class="card-text">${recipe2.description}</p>
      <button class="btn btn-primary addToFavBtn">Add to Favourites</button>
    `;

    cards[2].querySelector(".card-img-top").setAttribute("src", recipe3.img);
    cards[2].querySelector(".card-body").innerHTML = `
      <h5 class="card-title">${recipe3.title}</h5>
      <p class="card-text">${recipe3.description}</p>
      <button class="btn btn-primary addToFavBtn">Add to Favourites</button>
    `;
  });
}

//function to add recipe

var addToFavoriteBtn = $(".addToFavBtn");
var recipeCardTitle = $(".card-title");
$(".card-body").on("click", "button", function (event) {
  event.preventDefault();

  var recipeName = recipeCardTitle.text();
  favList.push(recipeName);
  localStorage.setItem("My favorites", JSON.stringify(favList));
  renderDropdownList();
});

var favList = JSON.parse(localStorage.getItem("My favorites")) || [];
var dropdownList = $(".dropdown-menu");

function renderDropdownList() {
  dropdownList.empty();

  for (var i = 0; i < favList.length; i++) {
    var newFavBtn = $("<button>");
    newFavBtn.text(favList[i]);
    newFavBtn.addClass("dropdown-item");
    newFavBtn.attr("type", "button");

    dropdownList.append(newFavBtn);
  }
}

function searcheByCountry(country) {
  $(".modal-body").empty();
  $("#exampleModal").modal('show');

  getCountryData(country, function (data) {
    createCountryInformationConteiner(data);
    $("#exampleModalLabel").text(country);

    getRecipeData(country, function (data) {
      createRecepiesConteiner(data);
    });
  });

}

//displais country information conteiner
function createCountryInformationConteiner(data) {
  // console.log(data[0])

  var rowEl = $("<div>");
  rowEl.addClass("row")

  var secondRowEl = $("<div>");
  secondRowEl.addClass("accordion");
  secondRowEl.attr("id", "accordion");

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
  var currenciesEl = $("<p>Currencies: " + data[0].currencies?.DKK?.name + " </p>");

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
  console.log(data, "sddd")
  data.hits.forEach((element, index) => {
    $('#accordion').append(`
      <div class="card-header row" id="headingOne${index}">
        <div class="col-3">
          <img class="card-img" src="${element.recipe.image}" alt="${element.recipe.label}"/>
        </div>
        <div class="col-9">
          <h5>${element.recipe.label}</h5>
          <p>Calories: ${element.recipe.calories} </p>
          <p>Cautions: ${element.recipe.cautions} </p>
          <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne${index}"
        aria-expanded="true" aria-controls="collapseOne"> Collapsible Group Item #1 </button>
        </div>
      </div>
      <div id="collapseOne${index}" class="collapse" aria-labelledby="headingOne${index}" data-parent="#accordion">
                        <div class="card-body"> Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the
                           <code>.show</code> class. </div>
      </div>
    `)
  })


  // data.hits.forEach((element, index) => {

  //   var cardBodyEl = $("<div>");
  //   cardBodyEl.addClass("card-body col-10");

  //   var h5El = $("<h5>");
  //   h5El.addClass("card-title");
  //   h5El.text(element.recipe.label);

  //   var pEl = $("<p>");
  //   pEl.addClass("card-text");
  //   pEl.text("cautions: " + element.recipe.cautions.join(","));

  //   var aEl = $("<a>");
  //   aEl.addClass("btn btn-primary");
  //   aEl.attr("data-toggle", "collapse");
  //   aEl.attr("data-target", "#collapse" + index);
  //   aEl.attr("aria-expanded", "true");
  //   aEl.attr("aria-controls", "collapse" + index);
  //   aEl.text("add to favorite");
  //   {/* <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" */ }
  //   //                             aria-expanded="true" aria-controls="collapseOne"> Collapsible Group Item #1 </button>

  //   // cardEl.append(cardBodyEl);
  //   // cardBodyEl.append(h5El);
  //   // cardBodyEl.append(pEl);
  //   // cardBodyEl.append(aEl);

  //   cardBodyEl.append(h5El);
  //   cardBodyEl.append(pEl);
  //   cardBodyEl.append(aEl);

  //   cardHeaderEl.append(imgEl);
  //   cardHeaderEl.append(cardBodyEl);

  //   cardEl.append(cardHeaderEl);
  //   cardEl.append(cardCollapseEl);

  //   $("#accordion").append(cardEl);
  // });

}




