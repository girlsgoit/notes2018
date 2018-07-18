$('#submit').click(checkData);

function checkData(e) {
    e.preventDefault();

    let text = $('#username').val();
    let password = $('#password').val();
    login(text, password);
}
