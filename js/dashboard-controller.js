let notes = [];
//cooperare cu serverul 
const requestObject = {
    url: "http://192.168.2.13:3000/notes/",
    type: 'GET',
    success: handleResponse,
    contentType: "application/json"
};
function handleResponse(data, status, dataAdditional) {
    if (dataAdditional.status === 200) {
        notes = data;
        populatePage();
    } else { 
        $(location).attr('href', '404.html');
    }
}

$.ajax(requestObject);