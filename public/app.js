//Grab the articles as a JSON
$.getJSON("/articles", function (data) {
  $("#articles").empty();
  for (let i = 0; i < 10; i++) {
    $("#articles").append(
      `<div id='card' data-id='${data[i]._id}'>"`,
      `<a href=https://news.google.com/${data[i].link}>
          <h5 data-id='${data[i]._id}'class='card-header'>${data[i].title}</h5></a>`,
      "<div class='card-body'> ",
      `<button id='saveButton' data-id='${data[i]._id}' class='comment-button btn btn-primary'>Save this article</button>`,
      "<h5 class='card-title'>" + "Source: " + data[i].source + "</h5>",
      "<br>",
      "</div>",
      "</div>",
      "<br><br>"
    );
  }
});

//Scrape new articles button
$(".scrape-btn").on("click", function () {
  $.get("/scrape").then(function (data) {
    window.location.reload();
  });
});

//Clear articles button
$(".clear-btn").on("click", function () {
  $("#articles").empty();
});

//Save the article button
$(document).on("click", "#saveButton", function () {
  //grabbing the ID associated with the article
  // Empty the notes from the note section
  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section

      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append(
        "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});
// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val(),
    },
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
