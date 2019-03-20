$(function() {
  var filter = {};
  var recursiveEncoded;
  var recursiveDecoded;

  // When user clicks on gender drop down
  $("#gender a").on("click", function(e) {
    console.log("gender selected");

    // Store the gender selected as "gender"
    var gender = $(this).text();
    console.log(gender);

    // If the gender selected was already selected, unselect it
    if (filter.gender === gender) {
      delete filter.gender;
      // Else select the new gender
    } else {
      filter.gender = gender;
    }
    console.log(filter);

    // Serialize our filter object as a query string and a URI-decoded version
    recursiveEncoded = $.param(filter);
    recursiveDecoded = decodeURIComponent($.param(filter));
    console.log(recursiveEncoded);
    console.log(recursiveDecoded);

    // Make an ajax call to get filtered pets
    updateList();
  });

  // When user click on age drop down
  $("#age a").on("click", function(e) {
    console.log("age selected");

    // Store the age selected as "age"
    var age = $(this).text();
    console.log(age);

    // If the age selected was already selected, unselect it
    if (filter.age === age) {
      delete filter.age;
      // Else select the new age
    } else {
      filter.age = age;
    }  
    console.log(filter);

    // Serialize our filter object as a query string and a URI-decoded version
    recursiveEncoded = $.param(filter);
    recursiveDecoded = decodeURIComponent($.param(filter));
    console.log(recursiveEncoded);
    console.log(recursiveDecoded);
    
    // Make an ajax call to get filtered pets
    updateList();
  });

  // Ajax call to filter pets
  function updateList() {
    query = recursiveEncoded;
    console.log(query);

    $.ajax({
      url: "/api/pets?" + query,
      method: "GET"
    }).then(function(res) {
      // Here res = an array of pet objects
      console.log(res);
    });
  }

  $(".change-adopted").on("click", function(e) {

    console.log("Adopt Me Clicked");

    var id = $(this).data("id");
    var newAdopted = $(this).data("newadopted");

    var newAdoptedState = {
      adopted: newAdopted
    };

    $.ajax("/api/pets/" + id, {
      type: "PUT",
      data: newAdoptedState
    }).then(function() {
      console.log("Changed adopted state to", newAdopted);
    })

  })

});

// location.reload();

// ---- all code below is example code--//

// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
