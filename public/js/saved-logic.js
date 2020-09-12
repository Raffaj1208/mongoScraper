var articleIdFromNote;

var clearTextField = function() {
    document.getElementById('noteTextInput').value="";
};

var deleteSavedArticle = function(articleId) {

    $.ajax({
        type: "PUT",
        url: "/delete-from-saved/" + articleId,
    }).then(function(response) {
        console.log(JSON.stringify(response));
        displaySaved();
    });
 };

var saveNewNote = function(articleId) {
    var newNoteText = $("#noteTextInput").val();
    console.log(newNoteText);
    $.ajax({
        type:"POST",
        url:"/create-note/" + articleId,
        data: { body: newNoteText, article: articleId }
    }).then(function(response){
        console.log(response);
        displayNotes(articleId);
    }); 
};

var displayNotes = function(articleId) {
    $.ajax({
        type:"GET",
        url:"/show-article-notes/" + articleId
    }).then(function(response) {
        console.log(response);
        document.getElementById("saved").style.display="none";
        document.getElementById("notes").style.display="block";
        
        var saveNoteInput = $("#button-addon4");
        saveNoteInput.empty();
        
        var saveNewNoteButton = $("<button>")
            .attr("id", articleId)
            .addClass("saveNoteButton")
            .attr("type", "button")
            .text("Save");
        
        saveNoteInput.append(saveNewNoteButton);
        
        var savedNotes = $("#savedArticleNotes");
        savedNotes.empty();

        console.log(response);
        
        for (var i = 0; i < response.note.length; i++) {
            var savedNote = response.note[i];;
            console.log(savedNote);

            var deleteNoteButton = $("<button>")
                .addClass("deleteNoteButton")
                .text("Delete")
                .attr("id", savedNote._id);

            var noteText = $("<p>")
                .addClass("noteText")
                .text(savedNote.body);

            var listItem = $("<li>")
                .addClass("articleNote")
                .append(noteText, deleteNoteButton);

            savedNotes.append(listItem);

        }

        $("#hideNotes").on("click", function() {
            document.getElementById("notes").style.display="none";
            document.getElementById("saved").style.display="block";
        });

        $(".saveNoteButton").on("click", function() {
            var articleId = $(this).attr('id');
            saveNewNote(articleId);
        });

        $(".deleteNoteButton").on("click", function() {
            var noteId = $(this).attr('id');
            articleIdFromNote = savedNote.article;
            console.log("deleteNoteButton clicked.");
            console.log(articleIdFromNote);
            deleteNote(noteId);
        });

        clearTextField();
    });
};

var deleteNote = function(noteId) {
    $.ajax({
        type: "DELETE",
        url: "/delete-note/" + noteId
    }).then(function(response) {
        displayNotes(articleIdFromNote);
    });
};

var displaySaved = function() {
    $.ajax({
        type:"GET",
        url:"/display-saved/"
    }).then(function(response) {
        console.log(response);

        var savedArticleResults = $("#savedArticles");
        savedArticleResults.empty();

        for (i = 0; i < response.length; i++) {
            var savedArticle = response[i];

            var deleteButton = $("<button>")
                .addClass("deleteButton")
                .text("Delete")
                .attr("id", savedArticle._id);

            var notesButton = $("<button>")
                .addClass("notesButton")
                .text("Comments")
                .attr("id", savedArticle._id);

            var title = $("<div>")
                .addClass("title")
                .text(savedArticle.title)
                .append(deleteButton)
                .append(notesButton);

            var link = $("<a>")
                .addClass("link")
                .text(savedArticle.link)
                .attr("href", savedArticle.link)
                .attr("target", "_blank");

            var summary = $("<p>")
                .addClass("summary")
                .text(savedArticle.summary);

            var listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            savedArticleResults.append(listItem);
        }
        
        
        $(".deleteButton").on("click", function() {
            console.log("deleteButton clicked");
            var articleId = $(this).attr('id');
            deleteSavedArticle(articleId);
        });
        
        $(".notesButton").on("click", function() {
            console.log("notesButton clicked");
            var articleId = $(this).attr('id');
            displayNotes(articleId);
        });
    });
};

$(document).ready(function(){      
    displaySaved(); 
});