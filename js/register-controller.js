
function register(firstname, lastname, username, password) {
    let user = {
        username: username,
        first_name: firstname,
        last_name: lastname,
        password: password,
    };

    const requestObject = {
        url: 'http://192.168.2.13:3000/users/register/',
        type: 'POST',
        data: JSON.stringify(user),
        complete: handleResponse,
        contentType: 'application/json'

    };

    $.ajax(requestObject);
}

function handleResponse(data, status) {
    if (data.status === 200) {
        $(location).attr('href','signin.html')
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

    const requestObject = {
        url: 'http://192.168.2.13:3000/users/is-unique/',
        type: 'POST',
        data: JSON.stringify(userNameObject),
        complete: handleIsUniqueResponse,
        contentType: 'application/json'
    };

    $.ajax(requestObject);
}

function handleIsUniqueResponse(data, status) {
    if (data.status === 200) {
        //totul ii bine 
    } else if (data.status === 400) {
        $('.validation-error').addClass('visible');
        $('.validation-error').append('username is already used!');
        // ceva ne to - de pus in console.log
    };

}