function populatePage() {

    if (User.authUser.theme) {
        $('head').append(`<style>${User.authUser.theme}</style>`);
    }

    let element;
    for (let index = 0; index < notes.length; index++) {
        const item = notes[index].note_elements[0];

        if (item) {
            element = getElementByTag(item);
        } else {
            element = '';
        }
        
        element = decorateNote(element, index);
        if (index % 2 === 0) {
            $('#col-left').prepend(element);
        } else {
            $('#col-right').prepend(element);
        }
    }
}

function decorateNote(elementString, index) {
    return `<span class="card" onclick="goTo(${notes[index].id})"> ${elementString} 
                <div class="card-tools">
					<span class="card-remove" onclick="removeNote(${index}, event)">Remove</span>
					<div class="card-date"> ${notes[index].created_date} </div>
				</div>
            </span>`;
}

function getElementByTag(item) {
    switch (item.tag) {
        case 'img':
            return `<img src="${item.content}">`;
        case 'ul':
            return `<ul>${splitList(item.content)}</ul>`;
        case 'a':
            return `<h2><span>${item.content}</span></h2>>`;
        default:
            return `<${item.tag}>${item.content}</${item.tag}>`;
    }
}

function splitList(content) {
    let arr = content.split('\n');
    let listItems = '';
    for (let elem of arr) {
        listItems += `<li>${elem}</li>`;
    }

    return listItems;
}

function removeNote(index, event) {
    event.stopPropagation();
    removeById(notes[index].id);
    notes.splice(index, 1);
    populatePage();
}

function goTo(id) {
    URL.redirect(`note.html?id=${id}`);
}

//Create Note
$('#new-note').click(createNote);