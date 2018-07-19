function handleLoginResponse(response) {
    const data = response.responseJSON;
    console.log(data);
    if (response.status === 200) {
        Auth.saveAuthentication(data);
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

    API.post('api-token-auth/', user, handleLoginResponse);
}
