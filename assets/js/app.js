// Global variables
// -----------------------------------------------
// Variable for searched country
let country;
//-----------------------------------------------
// Header/Navbar with logo and dropdown
$(document).ready(function () {

  //adds my favorite button with dropdown
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
      </div>\
    </div>\
  </nav>'
  );

  // runs renderDropdownList function
  renderDropdownList()
});
//-----------------------------------------------
// Function to render the dropdown list
function renderDropdownList() {
  // Render list
  var dropdownList = $('#header').find(".dropdown-menu");
  dropdownList.empty();

  //gets local storage data if data is empty 
  var favList = JSON.parse(localStorage.getItem("myFavorite")) || [];
  
  //fills dropdown list with recipes name
  if (favList.length > 0) {
    for (var i = 0; i < favList.length; i++) {
      //creates button element
      var newFavBtn = $("<button>");
      //adds recipe name
      newFavBtn.text(favList[i]);
      newFavBtn.addClass("dropdown-item");
      newFavBtn.attr("type", "button");
      dropdownList.append(newFavBtn);
    }
  }
}
//-----------------------------------------------
// search input field validation
//button disabled state
$("#search").attr("disabled", true);

//event listeners (change paste keyup)
$("#country").on("change paste keyup", function () {
  //search input field value
  var country = $(this).val();

  // new array of countries
  var coutriesArr = [];

  //loop countries object and gets country
  for (const key in countries) {
    if (Object.hasOwnProperty.call(countries, key)) {
      const element = countries[key];
      //fiils array with countries
      coutriesArr.push(element)
    }
  }
  //disables search element if value country do not match
  $("#search").attr("disabled", !(new RegExp(country, "i")).test("[" + coutriesArr.join("][") + "]"));
});

//-----------------------------------------------
// Event listener for the search button
$('#search').on('click', function () {
  country = $('#country').val();
  searcheByCountry(country);
});

// Event listener for the enter key
$('#country').on('keyup', function (e) {
  if (e.keyCode === 13) {
    $('#search').click();
  }
});

function searcheByCountry(country) {
  $(".modal-body").empty();

  //shows modal
  $("#recipeModal").modal('show');

  //gets data from restcountries
  getCountryData(country, function (data) {
    //runs function
    createCountryInformationConteiner(data);
    $("#recipeModalLabel").text(country);

    //gets data from edamam
    getRecipeData(country, function (data) {
      //runs function to fill 
      createRecipeConteiner(data, country);
    });
  });
}

// Displays country information container
function createCountryInformationConteiner(data) {

  //creates div element with row class 
  var rowEl = $("<div>");
  rowEl.addClass("row")

  //creates div element with accordion class 
  var secondRowEl = $("<div>");
  secondRowEl.addClass("accordion");
  secondRowEl.attr("id", "accordion");

  //creates info block
  var infoEl = $("<div>");
  infoEl.addClass("col-6");
  //creates flag image wrapper block
  var flagWrapperEl = $("<div>");
  flagWrapperEl.addClass("col-6");

  // creates image element
  var imgEl = $("<img/>");
  imgEl.attr("alt", data[0].capital[0]);
  imgEl.attr("src", data[0].flags.png);
  imgEl.attr("style", "height: 100px; float: right");

  //creates capital and region block
  var capitalEl = $('<div class= "dotIcon">\<i class="fa-solid fa-circle"></i>\<span> Capital: ' + data[0].capital[0] + ' </span></div>');
  var regionEl = $('<div class= "dotIcon">\<i class="fa-solid fa-circle"></i>\<span> Region: ' + data[0].region +  ' </span></div>');

  // currencies block
  var currencies = "";
  for (var currency in data[0].currencies) {
    currencies += data[0].currencies[currency].name + ", ";
  }
  currencies = currencies.slice(0, -2);
  var currenciesEl = $('<div class= "dotIcon">\<i class="fa-solid fa-circle"></i>\<span> Currencies: ' + currencies +  '</span></div>');

  infoEl.append(capitalEl);
  infoEl.append(regionEl);
  infoEl.append(currenciesEl);

  flagWrapperEl.append(imgEl);

  rowEl.append(infoEl);
  rowEl.append(flagWrapperEl);
  $(".modal-body").prepend(rowEl);
  $(".modal-body").append(secondRowEl);
}


//list array
//ToDo clears list array 
var list = [];

function createRecipeConteiner(data, country) {

  //checks if the data is not empty if empty show the text "We can not find recipes for this country"
  if (!data.hits.length) {
    $('#accordion').append(`<div class="d-flex justify-content-center align-items-center">We can not find recepies for this country</div>`)
  } else {
    $('#accordion').find(".card-body").html();

    //fills accordion selection with data from API
    //TODo refactor this code below

    data.hits.forEach((element, index) => {

      //creates unordered list and fills with ingredients
      var ulEl = $("<ul></ul>");
      element.recipe.ingredientLines.forEach(element => {
        var liEl = $("<li>" + element + "</li>");
        ulEl.append(liEl);
      });

      // fills list array with data
      list.push({
        index: index,
        country: country,
        image: element.recipe.image,
        label: element.recipe.label,
        calories: element.recipe.calories,
        cautions: element.recipe.cautions,
        list: ulEl[0],
      });
    
      $('#accordion').append(`
        <div class="card-header row" id="headingOne${index}">
          <div class="col-3">
            <img class="card-img" src="${element.recipe.image}" alt="${element.recipe.label}"/>
          </div>
          <div class="col-9 recipeContent">
            <h5 class="recipeHeader">${element.recipe.label}</h5>
            <p class="calories">Calories: ${Math.round(element.recipe.calories)} </p>
            <p class="cautions">Cautions: ${element.recipe.cautions} </p>
            <button class="btn btn-link text-left" type="button" data-toggle="collapse" data-target="#collapseOne${index}"
              aria-expanded="true" aria-controls="collapseOne"> Show more </button>
            <button data-id="${index}" class="btn btn-link text-left addToFavorite" type="button"> Add to favorites </button>
          </div>
        </div>
        <div id="collapseOne${index}" class="collapse" aria-labelledby="headingOne${index}" data-parent="#accordion">
            <div class="card-body">
            </div>
        </div>
      `);
      // appends card body recipe
      $('#accordion').find($(".card-body")[index]).append(ulEl[0]);
    })
  }
}

//function to add recipe to favorite dropdownlist
//ToDo clears favoriteArray array 
var favoriteArray = [];
// addToFavorite event handler
$("#recipeModal").on("click", ".addToFavorite", function (e) {
  e.preventDefault();
  //get recipe id
  var index = $(this).attr("data-id");
  
  favoriteArray.push(list[index].label);

  //save data to localstorage
  localStorage.setItem("myFavorite", JSON.stringify(favoriteArray));
  // runs renderDropdownList function
  renderDropdownList();
});







