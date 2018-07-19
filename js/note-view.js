const path = `notes/${URL.getQueryParam('id')}`;

let note = {};
let activeIndex = -1;
let activeCursor = null;


$('#first-cursor').on('click', function () {
    openEditor(this, 0);
});

// Note Add controls
$(document).click(() => {
    $('#note-add').removeClass('note-add-opened');
    $(activeCursor).removeClass('note-cursor-active');
});

$(document).on('click', '.js-note-cursor, #note-add, .js-note-cursor-first', (element) => {
    element.stopPropagation();
});

$('#delete-note').on('click', (e) => {
    e.preventDefault();
    let input = confirm('Are you sure you want to delete this note?');
    if (input) {
        API.delete(path, (response) => {
            if (response.status === 200) {
                URL.redirect('dashboard.html');
            } else {
                console.log(response);
            }
        });
    }
});

API.get(`notes/${URL.getQueryParam('id')}`, (response) => {
    if (response.status === 200) {
        note = response.responseJSON;
        refreshNoteElements();
        checkEmptyNoteElements();
    } else if (response.status === 404) {
        URL.redirect('404.html');
    } else {
        console.log(response);
    }
});


// ------------ FUNCTIONS --------------

// innoieste continutul din pagina
function refreshNoteElements() {
    const domNote = $('#note');
    domNote.empty();

    for (let index = 0; index < note.note_elements.length; index++) {
        const element = note.note_elements[index];
        const elementString = getElementString(element);
        let divElement = putIntoDiv(elementString, index);
        domNote.append(divElement);
    }
}

function checkEmptyNoteElements() {
    let $note = $('#note');
    console.log($note.children());
    if ($note.children().length === 0) {
        openEditor($('#first-cursor'), 0);
    }
}

// construieste elementele dupa tag
function getElementString(element) {
    if (element.content.trim() === '') {
        return;
    }

    switch (element.tag) {
        case ('img'):
            return `<img src="${element.content}">`;
        case ('ul'):
            return `<ul>${arrangeListElements(element.content)}</ul>`;
        case ('a'):
            const splittedLink = element.content.split('\n');
            return `<a href="${splittedLink[0]}" target="_blank">${splittedLink[1]}</a>`;
        default:
            return `<${element.tag}>${element.content}</${element.tag}>`;
    }
}

// configureaza lista
function arrangeListElements(listValues) {
    const listItems = listValues.split('\n');
    let listContent = '';
    for (let li of listItems) {
        listContent += `<li>${li}</li>\n`;
    }

    return listContent;
}

function putIntoDiv(elementContent, index) {
    return `<div class="note-element">
                ${elementContent}
                <span class="js-note-cursor note-cursor" onclick="openEditor(this, ${index + 1});" ></span>
                <span class="js-note-element-delete note-element-delete" data-index="${index}" onclick="removeElement(this);"><i class="fas fa-times"></i></span>
            </div>`;
}

// deschide editorul pentru a putea adauga un element nou
function openEditor(cursor, index) {
    activeCursor = cursor;
    activeIndex = index;
    $('.js-note-cursor').removeClass('note-cursor-active');
    $(activeCursor).addClass('note-cursor-active');
    $('#note-add').addClass('note-add-opened');
}

function removeElement(element) {
    const index = $(element).data('index');
    note.note_elements.splice(index, 1);

    //redesenam tat
    refreshNoteElements();

    API.put(path, note, (response) => {
        if (response.status !== 200) {
            console.log(response);
        }
    });
}

// functia insereaza un obiect in arr cu tagul si continutul
function insertElement(tag) {
    let $input = $('#add-element-content');
    let content = $input.val();
    let tagStructure = {
        tag: tag,
        content: content,
    };

    if (content.trim() === '') {
        return;
    }
    $input.val('');

    note.note_elements.splice(activeIndex, 0, tagStructure);
    $('.js-note-cursor').removeClass('note-cursor-active');
    refreshNoteElements();
    activeCursor = $('#note').children().eq(activeIndex).find('.js-note-cursor');
    activeCursor.addClass('note-cursor-active');
    activeIndex++;

    API.put(path, note, (response) => {
        if (response.status !== 200) {
            console.log(response);
        }
    });
}
