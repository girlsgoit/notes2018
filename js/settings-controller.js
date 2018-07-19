function modifySettings(first_name, last_name, password, css) {
    const authUser = Auth.getUser();
    authUser.firstName = first_name;
    authUser.lastName = last_name;
    authUser.password = password;
    authUser.settings = css;

    const id = Auth.getUser().id;
    HeaderControls.insertUserStyle();
    API.put(`users/${id}/`, JSON.stringify(authUser), handleResponse)
}

function handleResponse(response) {
    if (response.status !== 200) {
        console.log(response);
    }
}