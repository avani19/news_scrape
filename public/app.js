// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  for (var i = 0; i<data.length; i++){
    // display the apropos information on the page
    $('#articles').append('<div class="col m12 m6">' + '<div class="card blue-grey darken-1">'  + data[i].title + '<br />'+ data[i].link + '</br>' + '<button id="commentBtn" type="submit" data-target="modal1" class="waves-effect waves-light btn teal lighten-1" data-id="' + data[i]._id + '">' + 'Add Comment' + '</button>' +'</div>' + '</div>');
  }
});
// whenever someone clicks a p tag
$(document).on('click', '#commentBtn', function(){
  // empty the comments from the comment section
  $('.modal-content').empty();
  $('.modal-footer').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the comment information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
      $('.modal-content').append('<h4>' + data.title + '</h4>'); 
      // an input to enter a new title
      $('.modal-content').append('<input placeholder="Type your name" id="first_name" type="text" class="validate">'); 
      // a textarea to add a new comment body
      $('.modal-content').append('<textarea id="bodyinput" name="body"></textarea>'); 
      // a button to submit a new comment, with the id of the article saved to it
      $('.modal-footer').append('<button class=" modal-action modal-close waves-effect waves-green btn-flat" data-id="' + data._id + '" id="savecomment">Save Comment</button>');

      // $('#first_name').val("")
      // $('#bodyinput').val("")

      $('.modal').modal();
      // if there's a comment in the article
      if(data.comment){
        // place the title of the comment in the title input
        $('.card-action').append('Name: ' + data.comment.title );
        $('.card-action').append('Comment: ' + data.comment.body);
        // $('#first_name').val(data.comment.title);
        // place the body of the comment in the body textarea
        // $('#bodyinput').val(data.comment.body);
      }
    });
});

// when you click the savecomment button
$(document).on('click', '#savecomment', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  console.log($('#first_name').val());
  console.log($('#bodyinput').val());

  // run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#first_name').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from comment textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the comments section
      $('#first_name').val("");
      $('#bodyinput').val("");
      // $('.modal-content').empty();
      // $('.modal-footer').empty();
    });

  // Also, remove the values entered in the input and textarea for comment entry
  $('#first_name').val("");
  $('#bodyinput').val("");
});
