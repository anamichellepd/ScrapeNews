//Grab the articles as a JSON
$.getJSON("/articles", function (data) {
  for (let i = 0; i < 10; i++) {
    $("#articles").append(
      "<div class='card'>",
      "<h5 class='card-header'>" + data[i].title + "</h5>",
      "<div class='card-body'> ",
      "<a href='#'class='comment-button btn btn-primary'>" +
        "Save this article" +
        "</a>",
      "<h5 class='card-title'>" + "Source: " + data[i].source + "</h5>",
      "<br>",
      "<h5 class ='card-title'>" +
        " Link: " +
        data[i].link +
        "<a href=" +
        data[i].link +
        "</a>" +
        "</h5>",

      "</div>",
      "</div>",
      "<br><br>"
    );
  }
});
