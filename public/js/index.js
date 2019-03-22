$(function() {
  var filter = {};
  var recursiveEncoded;
  var recursiveDecoded;

  // --------gender select ------------//
  // When user clicks on gender drop down
  $("#gender a").on("click", function(e) {
    console.log("gender selected");

    // Store the gender selected as "gender"
    var gender = $(this).text();
    console.log(gender);
    //write the gender to the selections div
    $(".genders").html(gender);
    // If the gender selected was already selected, unselect it
    if (filter.gender === gender) {
      delete filter.gender;
      //delete the gender from div
      $(".genders").empty();
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
  $("#age a").on("click", function(e) {
    console.log("age selected");

    // Store the age selected as "age"
    var age = $(this).text();
    console.log(age);
    //write the age to the selections div
    $(".age").html(age);
    // If the age selected was already selected, unselect it
    if (filter.age === age) {
      delete filter.age;
      //delete the age from div
      $(".age").empty();
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
  $("#size a").on("click", function(e) {
    console.log("size selected");

    // Store the age selected as "age"
    var size = $(this).text();
    console.log(size);
    //write the size to the selections div
    $(".size").html(size);
    // If the age selected was already selected, unselect it
    if (filter.size === size) {
      delete filter.size;
      //delete the size from div
      $(".size").empty();
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

  // ------- Good With ------------
  // When user click on age drop down
  $("#good-with a").on("click", function(e) {
    console.log("good with selected");

    // Store the age selected as "age"
    var goodWith = $(this).text();
    console.log(goodWith);
    //write the good-with to the selections div
    $(".good-with").html(goodWith);
    // If the age selected was already selected, unselect it
    if (filter.goodWith === goodWith) {
      delete filter.goodWith;
      //delete the good-with from div
      $(".good-with").empty();
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
    }).then(function(res) {
      // Here res = an array of pet objects

      var result = res;

      for (var i = 0; i < result.length; i++) {
        var newDiv = $("<div>");
        var name = $("<h2>").text("Name: " + result[i].name);
        var breed = $("<li>").text("Breed: " + result[i].breed);
        var age = $("<li>").text("Age: " + result[i].age);
        var size = $("<li>").text("Size: " + result[i].size);
        var gender = $("<li>").text("Gender: " + result[i].gender);
        var location = $("<li>").text("Location: " + result[i].location);
        var button = $(
          '<button class="change-adopted" data-id="' +
            result[i].id +
            '" data-newadopted="' +
            result[i].adopted +
            '">Adopt Me</button>'
        ).click(function() {
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
          });
        });

        // add all the vars to newDiv
        newDiv.append(name, breed, size, gender, age, location, button);
        $("#petListing").append(newDiv);
      }

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
    });
  });
});
