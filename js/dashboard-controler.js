const requestObjectCreate = {
    url: '192.168.2.13:3000/notes',
    type: 'POST',
    contentType: 'application/json',
    success: requestResponsePost,
  };

  function newNote() {
    $.ajax(requestObjectCreate);
  }

  function requestResponsePost(data, status) {
    console.log("Success");
    $(location).attr('href', 'note.html');
  }