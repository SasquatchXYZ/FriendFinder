const friends = require('../data/friends');

// ---------------------------------------------------------------------------------------------------------------------
// This function adds the Math.min capability to the Array.Prototype, which will be used later (line ) in finding
// our best compatibility match.
Array.min = function(array) {
    return Math.min.apply(Math, array)
};

// ---------------------------------------------------------------------------------------------------------------------
module.exports = function (app) {

    // Route to GET the API friends data.
    app.get('/api/friends', function (req, res) {
        res.json(friends)
    });

    // Route to respond the the users input and POST their data to the friends.js.
    // Also performs the calculations in order to determine compatibility.
    app.post('/api/friends', function (req, res) {
        /*Array.min = function(array) {
            return Math.min.apply(Math, array)
        };*/

        let comparisonResults = [];
        let newUserScores = [];

        for (let k = 0; k < req.body.scores.length; k++) {
            newUserScores.push(parseInt(req.body.scores[k]))
        }

        let newUser = {
            name: req.body.name,
            photo: req.body.photo,
            scores: newUserScores
        };

        //console.log(typeof newUser.scores[2]);
        //console.log(typeof friends[0].scores[2]);

        friends.forEach(function(friend) {
            console.log(friend.scores);
            console.log(newUser.scores);

            let comparisonArray = [];
            for (let v = 0; v <friend.scores.length; v++) {
                comparisonArray.push(Math.abs(friend.scores[v] - newUser.scores[v]));
            }
            console.log(`compare ${comparisonArray}`);
            let totalDiff = comparisonArray.reduce((a, b) => a + b, 0);
            console.log(totalDiff);
            comparisonResults.push(totalDiff);
        });
        console.log(comparisonResults);

        let bestComp = Array.min(comparisonResults);
        console.log(bestComp);
        let bestIndex = comparisonResults.indexOf(bestComp);
        console.log(friends[bestIndex]);

        res.json(friends[bestIndex]);


        //friends.push(newUser);

        console.log('new testtaker added')
    });
};