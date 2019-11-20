
// LOAD DATA
// We are linking our routes to a series of "data" sources.

var friendsArray = require("../app/data/friends");

// ROUTING
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body parsing middleware

    var newFriend = req.body;
    //loop through scores array to make the strings into numbers
    for (i = 0; i < newFriend.scores.length; i++){
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
    };  

    // default friend match is the first friend but result will be whoever has the minimum difference in scores
    var bestFriendIndex = 0;
    var minimumDifference = 40;

    // in this for-loop, start off with a zero difference and compare the user and the index friend scores, one set at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friendsArray.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friendsArray[i].scores.length; j++) {
        var difference = Math.abs(newFriend.scores[j] - friendsArray[i].scores[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      if(totalDifference <= minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add user to friend array
    friendsArray.push(newFriend);

    // send back to browser the best friend match
    res.json(friendsArray[bestFriendIndex]); //where does this go too ?
  });
};


    
