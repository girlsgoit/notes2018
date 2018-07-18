function handleLoginResponse(response) {
    const data = response.responseJSON;

    if (response.status === 200) {
        localStorage.setItem('authUser', JSON.stringify(data));
        $(location).attr('href', 'dashboard.html');
    } else {
        console.log(data.message);
    }

}

function login(text, password) {
    let user = {
        username: text,
        password: password
    };

    API.post('auth/login/', user, handleLoginResponse);
}

function deleteNote(id){
    const requestObjectDelete = {
        url: `http://192.168.2.13:3000/${notes.id}`,
        type: 'DELETE',
        success: handleResponse,
        contentType: 'application/json'
     };
     $.ajax(requestObjectDelete);
}
