function handleLoginResponse(response, status, data1) {
    console.log(data1);
    const data = response.responseJSON;

    if (response.status === 200) {
        User.saveUser(data);
        $(location).attr('href', 'dashboard.html');
    } else {
        console.log(data);
    }
}

function login(text, password) {
    let user = {
        username: text,
        password: password
    };

    API.post('auth/login/', user, handleLoginResponse);
}
