
function modifySettings(first_name, last_name, password, css) {

    let modifyObject = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        theme: css
    };

    User.saveUser(modifyObject);
    const id = URL.getQueryParam('id');
    API.put(`users/${id}/`, JSON.stringify(modifyObject), handleResponse)
}

function handleResponse(response) {
    if (response.status === 200) {
        const user = response.responseJSON;
        User.saveUser(user);
    } else {
        console.log('Could not save settings');
        console.log(response.responseJSON);
    }
}