
$('#submit').click(checkData);
function checkData() {
    let text = $('#email').val();
    let password = $('#password').val();
    login(text,password);
}



