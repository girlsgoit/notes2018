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

