let notes = [];

// cooperare cu serverul
function handleResponse(response) {
    if (response.status === 200) {
        notes = response.responseJSON;
        populatePage();
    } else {
        $(location).attr('href', '404.html');
    }
}

API.get('notes/', handleResponse);