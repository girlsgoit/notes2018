$('#save-settings').click(manageSave);

function manageSave() {
    let firstName = $('#firstname-input').val();
    let lastName = $('#lastname-input').val();
    let oldPassword = $('#oldpassword-input').val();
    let newPassword = $('#newpassword-input').val();
    let confirmPassword = $('#confirmpassword-input').val();
    let customTheme = $('#customtheme-input').val();

    if (!isEmpty(firstName) || !isEmpty(lastName) || !isEmpty(newPassword) || !isEmpty(customTheme)) {

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

        if (isEmpty(firstName) && User.authUser) {
            firstName = User.authUser.firstName;
        }

        if (isEmpty(lastName) && User.authUser) {
            lastName = User.authUser.lastName;
        }

        if (isEmpty(customTheme) && User.authUser) {
            customTheme = User.authUser.customTheme;
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


