
$(function () {
  var filter = {};
  var recursiveEncoded;
  var recursiveDecoded;

  // --------gender select ------------//
  // When user clicks on gender drop down
  $("#gender a").on("click", function (e) {
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



  // ---------- Age select -------------//
  // When user click on age drop down
  $("#age a").on("click", function (e) {
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

  // ------- Size Select -------//
  // When user click on size drop down
  $("#size a").on("click", function (e) {
    console.log("size selected");

    // Store the age selected as "age"
    var size = $(this).text();
    console.log(size);

    // If the age selected was already selected, unselect it
    if (filter.size === size) {
      delete filter.size;
      // Else select the new age
    } else {
      filter.size = size;
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

  // ------- Goode With ------------
  // When user click on age drop down
  $("#good-with a").on("click", function (e) {
    console.log("good with selected");

    // Store the age selected as "age"
    var goodWith = $(this).text();
    console.log(goodWith);

    // If the age selected was already selected, unselect it
    if (filter.goodWith === goodWith) {
      delete filter.goodWith;
      // Else select the new age
    } else {
      filter.goodWith = goodWith;
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



  //Create a function that uses Ajax call to filter pets
  function updateList() {
    query = recursiveEncoded;
    console.log(query);

    $("#petListing").html("");

    $.ajax({
      url: "/api/pets?" + query,
      method: "GET"
    }).then(function (res) {
      // Here res = an array of pet objects

      var result = res;

      for (var i = 0; i < result.length; i++) {
        var newDiv = $("<div>");
        var name = $("<h2>").text("Name: " + result[i].name);
        var breed = $("<li>").text("Breed: " + result[i].breed);
        var age = $("<li>").text("Age: " + result[i].age);
        var size = $("<li>").text("Size: " + result[i].size)
        var gender = $("<li>").text("Gender: " + result[i].gender);
        var location = $("<li>").text("Location: " + result[i].location);


        // add all the vars to newDiv
        newDiv.append(name, breed, size, gender, age, location, button);
        $("#petListing").append(newDiv);


        var button = $("<button class='change-adopted'>").click(function () {
          $("p").append("Adopt Me");
        })
      }


      console.log(res);

    });
  }


  $(".change-adopted").on("click", function (e) {

    console.log("Adopt Me Clicked");

    var id = $(this).data("id");
    var newAdopted = $(this).data("newadopted");

    var newAdoptedState = {
      adopted: newAdopted
    };

    $.ajax("/api/pets/" + id, {
      type: "PUT",
      data: newAdoptedState
    }).then(function () {
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
