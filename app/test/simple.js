$("#quiz-results").on("click", function (event) {
    event.preventDefault();
    checkForm();
    if (checkForm()) {
        //console.log($("#q1").val().trim());
        //console.log(parseInt($("#q1").val().trim()));

        let newUserScores = [];

        for (let k = 1; k <= 10; k++) {
            newUserScores.push(parseInt($(`#q${[k]}`).val()))
        }

        let newUser = {
            name: $("#name").val().trim(),
            photo: $("#photo").val().trim(),
            scores: newUserScores
        };

        //console.log(newUser);
        //console.log(typeof newUser.scores[2]);

        $.post("/api/friends", newUser)
            .then(function (data) {
                console.log(JSON.stringify(data, null, 2));
                $("#match-name").text(data.name);
                $("#match-photo").attr('src', data.photo);

                $("#quizResultsModal").modal('show');
            });

        // Clears the Quiz Form
        $('.form-control').val('');
        $('.custom-select').val('Chose an Option:');

    } else {
        alert("You must fill out all of the fields in order for this to work properly.")
    }
});

function checkForm() {
    let validResponse = true;

    // Checks the Name and Photo Inputs to ensure that they are not left blank.
    $(".form-control").each(function () {

        if ($(this).val().trim() === "") {
            validResponse = false;
            console.log('Missing Name || Photo');
            return validResponse
        }
    });

    // Checks Each of the quiz select boxes to ensure that a
    // value has been entered for each question.
    $(".custom-select").each(function () {

        if (isNaN(parseInt($(this).val()))) {
            validResponse = false;
            console.log('Missing a question');
            return validResponse
        }
    });

    console.log(validResponse);
    return validResponse
}

/*

function checkName() {
    let validResponse = true;

    let checkName = $('#name').val().trim();
    console.log(checkName);
    const parse_name = /^[a-z]+(?:\s?)?(?:[a-z]+)?$/i;

    if (!parse_name.test(checkName)) {
        console.log('Name Not Valid');
        validResponse = false;
        console.log(validResponse);
        return validResponse
    }

    console.log(validResponse);

}

function checkPhoto() {
    let validResponse = true;

    let checkPhoto = $('#photo').val().trim();
    console.log(checkPhoto);
    const parse_url = /^((https?|ftp):\/\/.*\.(?:png|jpg|gif|jpeg|bmp))/i;

    if (!parse_url.test(checkPhoto)) {
        console.log('Photo Not Valid');
        validResponse = false;
        console.log(validResponse);
        return validResponse;
    }

    console.log(validResponse);

}*/
