const friends = require('../data/friends');

// ---------------------------------------------------------------------------------------------------------------------
// This function adds the Math.min capability to the Array.Prototype, which will be used later (line ) in finding
// our best compatibility match.
Array.min = function (array) {
    return Math.min.apply(Math, array)
};

// ---------------------------------------------------------------------------------------------------------------------
module.exports = function (app) {

    // Route to GET the API friends data.
    app.get('/api/friends', function (req, res) {
        res.json(friends)
    });

    // POST route that receives the users input for the quiz, it then performs the necessary comparison calculations
    // in order to determine compatibility, and then delivers the object for the best match individual.
    app.post('/api/friends', function (req, res) {

        let comparisonResults = [];
        let newUserScores = [];

        for (let k = 0; k < req.body.scores.length; k++) {
            newUserScores.push(parseInt(req.body.scores[k])) // Convert String to Number and Push to array.
        }

        let newUser = {
            name: req.body.name,
            photo: req.body.photo,
            scores: newUserScores
        };


        friends.forEach(function (friend) {
            console.log(friend.scores);
            console.log(newUser.scores);

            let comparisonArray = [];
            for (let v = 0; v < friend.scores.length; v++) {
                comparisonArray.push(Math.abs(friend.scores[v] - newUser.scores[v])); //Push to the compare array the difference for each answer.
            }
            console.log(`compare ${comparisonArray}`);
            let totalDiff = comparisonArray.reduce((a, b) => a + b, 0);
            console.log(totalDiff); // Reduce the Array to a single value indicating Total Difference.
            comparisonResults.push(totalDiff);
        });
        console.log(comparisonResults); // This is the array of all of the stored friends and their difference from the new User.

        // Use of the modified Array Prototype to find the lowest value indicating the closest match.
        let bestComp = Array.min(comparisonResults);
        console.log(bestComp);
        let bestIndex = comparisonResults.indexOf(bestComp);
        console.log(friends[bestIndex]);

        res.json(friends[bestIndex]);

        friends.push(newUser);

        console.log('New User Added, and Response Sent')
    });
};