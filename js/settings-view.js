$('#save-settings').click(manageSave);

function manageSave() {
    let firstName = $('#firstname-input').val();
    let lastName = $('#lastname-input').val();
    let oldPassword = $('#oldpassword-input').val();
    let newPassword = $('#newpassword-input').val();
    let confirmPassword = $('#confirmpassword-input').val();
    let customTheme = $('#customtheme-input').val();

    if (!isEmpty(firstName) || !isEmpty(lastName) || !isEmpty(newPassword)) {

        if (!isEmpty(newPassword)) {

            if (newPassword !== confirmPassword) {
                console.log("confirm your password");
                $('#newpassword-input').val('');
                $('#confirmpassword-input').val('');
                return;
            }

            if (newPassword === oldPassword) {
                console.log("identical passwords");
                $('#oldpassword-input').val('');
                $('#newpassword-input').val('');
                $('#confirmpassword-input').val('');
                return;
            }
        }

        if (isEmpty(firstName)) {
            firstName = JSON.parse(localStorage.getItem('firstName'));
        }

        if (isEmpty(lastName)) {
            lastName = JSON.parse(localStorage.getItem('lastName'));
        }

        if (isEmpty(customTheme)) {
            customTheme = JSON.parse(localStorage.getItem('customTheme'));
        }

        modifySettings(firstName, lastName, newPassword, customTheme);
    }
}

function isEmpty(content) {
    return content.trim() === '';
}

// function redirect (){
//     $(location).attr("href", "../dashboard.html");
// }
// function myFunction(){
//     putSettings();
//     redirect();

// }


