const path = require('path');

module.exports = function (app) {

    // Route to GET the survey page and send that to the user.
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'))
    });


    // Returns to Homepage if no matching route is located.
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'))
    });
};