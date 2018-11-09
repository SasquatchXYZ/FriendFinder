const friends = require('../data/friends');

module.exports = function (app) {

    // Route to GET the API friends data.
    app.get('/api/friends', function (req, res) {
        res.json(friends)
    });

    // Route to respond the the users input and POST their data to the friends.js.
    // Also performs the calculations in order to determine compatibility.
    app.post('/api/friends', function (req, res) {

    });
};