// Get references to page elements
var $petText = $("#pet-text");
var $petDescription = $("#pet-description");
var $submitBtn = $("#submit");
var $petList = $("#pet-list");


// The API object contains methods for each kind of request we'll make
var API = {
  // Make a POST call to the url "api/pets/new" to add a pet to the db
  savePet: function(pet) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/pets/new",
      data: JSON.stringify(example)
    });
  },
  // Make a GET call to the url "api/pets" to get all pets from the db
  getPets: function() {
    return $.ajax({
      url: "api/pets",
      type: "GET"
    });
  },
  // Make a DELETE call to the url "api/pets/:id" to remove a pet from the db
  deletePet: function(id) {
    return $.ajax({
      url: "api/pets/" + id,
      type: "DELETE"
    });
  }
};

// refreshPets gets new pets from the db and repopulates the list
var refreshPets = function() {
  API.getPets().then(function(data) {
    var $pets = data.map(function(pet) {
      var $a = $("<a>")
        .text(pet.text)
        .attr("href", "/pets/" + pet.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": pet.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $petList.empty();
    $peptList.append($pets);
  });
};

// handleFormSubmit is called whenever we submit a new pet
// Save the new pet to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var pet = {
    text: $petText.val().trim(),
    description: $petDescription.val().trim()
  };

  if (!(pet.text && pet.description)) {
    alert("You must enter a pet text and description!");
    return;
  }

  API.savePet(pet).then(function() {
    refreshPets();
  });

  $petText.val("");
  $petDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletePet(idToDelete).then(function() {
    refreshPets();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$petList.on("click", ".delete", handleDeleteBtnClick);