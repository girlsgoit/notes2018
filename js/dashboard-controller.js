let notes = [];

// cooperare cu serverul
function handleResponse(response) {
    if (response.status === 200) {
        notes = response.responseJSON;
        populatePage();q
    } else {
        console.log(response.responseJSON)
    }
}

API.get('notes/', handleResponse);