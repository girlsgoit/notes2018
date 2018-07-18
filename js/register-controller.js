function register(firstname, lastname, username, password) {
    let user = {
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password,
    };

    API.post('users/register/', user, handleResponse);
}

function handleResponse(xhr, status, data) {
    if (xhr.status === 200) {
        $(location).attr('href','signin.html');
    } else {
        $('.validation-error').text('something went wrong');
    }

}

function verifyIfUnique() {
    let username = $('#username').val();
    // send to server username on api: /users/is-unique/ POST { username: fullName }
    let userNameObject = {
        username: username
    };

    API.post('users/is-unique/', userNameObject, handleIsUniqueResponse);
}

function handleIsUniqueResponse(xhr, status, data) {
    if (xhr.status === 200) {
        //totul ii bine
    } else if (xhr.status === 400) {
        const errorField = $('.validation-error');
        errorField.addClass('visible');
        errorField.append('username is already used!');
        // ceva ne to - de pus in console.log
    }
}