
function modifySettings(first_name, last_name, password, css) {

    let modifyObject = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        theme: css
    };

    let id = localStorage.getItem('id');
    let firstname = localStorage.getItem('first_name');
    let lastname = localStorage.getItem('last_name');
    let theme = localStorage.getItem('css');
  
    const requestModification = {
        url: `http://192.168.2.13:3000/users/${id}/`,
        type: 'PUT',
        contentType: 'application/json',
        success: responseSettings,
        data: JSON.stringify(modifyObject)
    };

    $.ajax(requestModification);
}

function responseSettings(data, status) {

    if (data.status === 200) {
        console.log("tot ok, saved");
    }
    }