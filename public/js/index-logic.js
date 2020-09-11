$("#scrapeButton").on("click", function () {
    $.ajax({
        type:"GET",
        url:"/articles"
    }).then(function(response) {
        console.log(response);

        var articleResults = $("#results");
        articleResults.empty();

        for (i = 0; i < response.length; i++) {
            var article = response[i];

            var saveButton = $("<button>")
                .addClass("saveButton")
                .text("Save")
                .attr("id", article._id);

            var title = $("<div>")
                .addClass("title")
                .text(article.title)
                .append(saveButton);

            var link = $("<a>")
                .addClass("link")
                .text(article.link)
                .attr("href", article.link)
                .attr("target", "_blank");

            var summary = $("<p>")
                .addClass("summary")
                .text(article.summary)

            var listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            articleResults.append(listItem);
        }
    });
    hideContainer();
    showScrapeResults();
    
});

$(document).on("click", '.saveButton', function(){
    var articleId = $(this).attr('id');
    console.log("Article ID: " + articleId);

    $.ajax({
        type: "PUT",
        url: "/save-article/" + articleId,
    }).then(function(response) {
        console.log(JSON.stringify(response));
        
    });
});

var hideContainer = function() {
    $("#container").hide();

};

var showScrapeResults = function() {
    $("#scrapeResults").show(600);
};