let notes = [];

// cooperare cu serverul
API.get('notes/', handleGetNotes);

function handleGetNotes(response) {
    if (response.status === 200) {
        notes = response.responseJSON;
        populatePage();
    } else {
        console.log(response.responseJSON)
    }
}

function removeById(id) {
    API.delete(`notes/${id}`, handleRemoveNote);
}

function handleRemoveNote(response) {
    console.log('test remove note');
    if (response.status === 200) {
        populatePage();
    } else {
        console.log('remove note unsuccessfully');
    }
}
