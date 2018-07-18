// FUNCTIONS
// innoieste continutul din pagina
function refreshNoteElements() {
    const domNote = $('#note');
    domNote.empty();

    for (let index = 0; index < elementsArray.length; index++) {
        const element = elementsArray[index];
        const elementString = getElementString(element);
        let divElement = putIntoDiv(elementString, index);
        domNote.append(divElement);
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

function removeElement(element) {
    const index = $(element).data('index');
    elementsArray.splice(index, 1);

    //redesenam tat
    refreshNoteElements();
}

// functia insereaza un obiect in arr cu tagul si continutul
function insertElement(tag) {

    let content = $('#add-element-content').val();
    let tagStructure = {
        tag: tag,
        content: content,
    };

    if (content.trim() === '') {
        return;
    }

    arr.splice(activeIndex, 0, tagStructure);
    $('#add-element-content').val('');
    $('.js-note-cursor').removeClass('note-cursor-active');
    refreshNoteElements();

    $('#note').children().eq(activeIndex).find('.js-note-cursor').addClass('note-cursor-active');
    activeIndex++;

}

// content.trim();
// if(length.content!==0)
// { }

// seteaza datele pentru a putea adauga un element nou
function openEditor(cursor, index) {
    activeCursor = cursor;
    activeIndex = index;
    $('.js-note-cursor').removeClass('note-cursor-active');
    $(activeCursor).addClass('note-cursor-active');
    $('#note-add').addClass('note-add-opened');
}


function requestResponsePost(data, status, infAditionala) {
    console.log('test');

    let test = JSON.parse(data)
    if (infAditionala.status.status === 404) {
        console.log("error");
    } else {
        console.log('test');
        console.log(test.note_elements);
        //elementsArray = data.note_elements;
    }

}

function checkEmptyNoteElements() {
    console.log($('#note').children());
    if ($('#note').children().length === 0) {
        openEditor($('#first-cursor'), 0);
    }
}


let elementsArray = [];
let activeIndex = -1;
let activeCursor = null;

let arr = [
    // { tag: 'h1', content: 'Text Frumos H1' },
    // { tag: 'h2', content: 'Text Frumos H2' },
    // { tag: 'h3', content: 'Text Frumos H3' },
    // { tag: 'p', content: 'Text Frumos P' },
    // { tag: 'img', content: 'https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i86150a51964976d0/version/1490283314/most-beautiful-landscapes-in-europe-copyright-vicky-sp-european-best-destinations.jpg' },
    // { tag: 'ul', content: 'Primul element\nAl 2-lea element\nAl 3-lea element' },
    // { tag: 'a', content: 'Primul element\nAl 2-lea element\nAl 3-lea element' },
];

elementsArray = arr;
refreshNoteElements();

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


// array-ul cu elementele notitei
const requestObjectCreate = {
    url: 'https://192.168.2.13:3000/notes/1',
    type: 'GET',
    contentType: 'application/json',
    success: requestResponsePost
};

$.ajax(requestObjectCreate);

checkEmptyNoteElements();