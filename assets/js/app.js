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
      </div>\
    </div>\
  </nav>'
  );


  renderDropdownList()
});


function renderDropdownList() {
  // Render list
  var dropdownList = $('#header').find(".dropdown-menu");
  dropdownList.empty();
  var favList = JSON.parse(localStorage.getItem("myFavorite"));
  if (favList.length > 0) {
    for (var i = 0; i < favList.length; i++) {
      var newFavBtn = $("<button>");
      newFavBtn.text(favList[i]);
      newFavBtn.addClass("dropdown-item");
      newFavBtn.attr("type", "button");
      dropdownList.append(newFavBtn);
    }
  }
}

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


function searcheByCountry(country) {
  $(".modal-body").empty();
  $("#exampleModal").modal('show');

  getCountryData(country, function (data) {
    createCountryInformationConteiner(data);
    $("#exampleModalLabel").text(country);

    getRecipeData(country, function (data) {
      createRecepiesConteiner(data, country);
    });
  });
}

//displais country information conteiner
function createCountryInformationConteiner(data) {
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
  imgEl.attr("src", data[0].flag);
  imgEl.attr("style", "height: 100px; float: right");

  var capitalEl = $('<div class= "dotIcon">\<i class="fa-solid fa-circle"></i>\<span> Capital: ' + data[0].capital[0] + ' </span></div>');
  var regionEl = $('<div class= "dotIcon">\<i class="fa-solid fa-circle"></i>\<span> Region: ' + data[0].region +  ' </span></div>');

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



var list = [];

function createRecepiesConteiner(data, country) {
  if (!data.hits.length) {
    $('#accordion').append(`<div class="d-flex justify-content-center align-items-center">We can not find recepies for this country</div>`)
  } else {
    $('#accordion').find(".card-body").html();

    data.hits.forEach((element, index) => {
      var ulEl = $("<ul></ul>");
      element.recipe.ingredientLines.forEach(element => {
        var liEl = $("<li>" + element + "</li>");
        ulEl.append(liEl);
      });

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
            <p class="calories">Calories: ${element.recipe.calories} </p>
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

      $('#accordion').find($(".card-body")[index]).append(ulEl[0]);
    })
  }
}

//function to add recipe to favorite dropdownlist
var favoriteArray = [];
$("#exampleModal").on("click", ".addToFavorite", function (e) {
  e.preventDefault();
  var index = $(this).attr("data-id");
  console.log(list[index].label);
  favoriteArray.push(list[index].label)
  localStorage.setItem("myFavorite", JSON.stringify(favoriteArray));
  renderDropdownList()
});







