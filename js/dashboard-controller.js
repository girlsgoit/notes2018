let notes = [];

// cooperare cu serverul
function handleResponse(response) {
    if (response.status === 200) {
        notes = response.responseJSON;
        populatePage();
    } else {
        console.log(response.responseJSON)
    }
}

API.get('notes/', handleResponse);

//Create Note
function createNote() {
    API.post('notes/', { "note_elements": [] }, (response) => {

        if (response.status === 200) {
            const createdNote = response.responseJSON;
            URL.redirect(`note.html?id=${createdNote.id}`);
        } else {
            console.log('Error creating the note');
            console.log(response.responseJSON);
        }
    });
}