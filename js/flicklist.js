

var model = {
  watchListItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "7de13a6b1095d4cf1b2017cae1981f99" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2 - DONE
			// update the model, setting its .browseItems property equal to the movies we recieved in the response

				$.each(response.results, function(i) {

					model.browseItems.push(response.results[i]);
					//model.watchListItems.push(response.results[i]);
					//model.browseItems.push(JSON.stringify(response.results[i]));

				});
				
				//console.log(JSON.stringify(model.watchListItems));

			// invoke the callback function that was passed in. 
				callback();
		}
	});
  
}


function emptyLists() {

	//console.log("test render");
  
	// TODO 7
	// clear everything from both lists
  
	$('#watchul').empty();
	$('#browseul').empty();

}

/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  //console.log("test render");

  // TODO 7
  // clear everything from both lists



  // TODO 6 - DONE
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  
  $.each(model.watchListItems,function(index, value){
		//console.log('My array has at position ' + index + ', this value: ' + JSON.stringify(value.title));
		//console.log(JSON.stringify(movie));
		var newWatchLI = $("<li></li>").text(JSON.stringify(value.title)).attr("class", "watchItems");
		$("#section-watchlist ul").append(newWatchLI);
		console.log(index);

});

  //console.log(JSON.stringify(model.watchListItems));
  // for each movie on the current browse list, 
  //model.browseItems.forEach(function(movie) {
		// TODO 3 - DONE
		// insert a list item into the <ul> in the browse section
		// TODO 4 - DONE
		// the list item should include a button that says "Add to Watchlist"

		
$.each(model.browseItems,function(index, value){
	//console.log('My array has at position ' + index + ', this value: ' + JSON.stringify(value.title));

		//console.log(JSON.stringify(movie));
		var newLI = $("<li></li>").text(JSON.stringify(value.title)).attr("class", "browseItems");
		$("#section-browse ul").append(newLI).append('<p><button id="browse' + index + '" class="browse">Add to watchlist</button></p><br />');

		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be 
		//called again

		//on button click get index of object - slice it from the Browse List and push it into the WatchList
		$("#browse" + index).click(function(){
			model.watchListItems.push(model.browseItems.splice(index, 1)[0]);
			//console.log(model.browseItems.splice(index, 1)[0]);
			//console.log(index);

			
			emptyLists();
			render.call(this);
		
		});
});


};
// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});