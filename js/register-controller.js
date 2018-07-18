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
        const errorField = $('.validation-error');
        errorField.addClass('visible');
        errorField.text('something went wrong');
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
    if (xhr.status === 400) {
        const errorField = $('.validation-error');
        errorField.addClass('visible');
        errorField.text('username is already used!');
    }
}