//Grab the articles as a JSON
$.getJSON("/articles", function (data) {
  for (let i = 0; i < 10; i++) {
    $("#articles").append(
      "<div class='card'>",
      "<a href=https://news.google.com/" +
        data[i].link +
        "<h5 data-id='" +
        data[i]._id +
        "'class='card-header'>" +
        data[i].title +
        "</h5></a>",
      "<div class='card-body'> ",
      "<a href='#'class='comment-button btn btn-primary'>" +
        "Save this article" +
        "</a>",
      "<h5 class='card-title'>" + "Source: " + data[i].source + "</h5>",
      "<br>",

      "</div>",
      "</div>",
      "<br><br>"
    );
  }
});
