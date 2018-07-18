$('#submit').click(checkData);

function checkData(e) {
    e.preventDefault();

    let text = $('#email').val();
    let password = $('#password').val();
    login(text, password);
}



