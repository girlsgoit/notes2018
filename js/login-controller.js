function handleLoginResponse(response) {
    const data = response.responseJSON;
    console.log(response);

    if (response.status === 200) {
        User.saveUser(data);
        $(location).attr('href', 'dashboard.html');
    } else {
        const errorField = $('.validation-error');
        errorField.addClass('visible');
        errorField.text('Incorrect username or password');
    }
}

function login(text, password) {
    let user = {
        username: text,
        password: password
    };

    API.post('auth/login/', user, handleLoginResponse);
}
