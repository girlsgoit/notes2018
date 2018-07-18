function handleLoginResponse(data, status, infAditionala) {
    if (infAditionala.status === 200) {
        $(location).attr('href', 'dashboard.html');
    }
}

function login(text, password) {
    let user = {
        text: text,
        password: password
    };

    const requestObject = {
        url: 'https://192.168.2.13:3000/login',
        type: 'PUT',
        succes: handleLoginResponse,
        contentType: 'application/json',
        data: JSON.stringify(user)
    };

    $.ajax(requestObject);
}
