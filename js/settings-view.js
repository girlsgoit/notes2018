let firstName = $('#firstname-input');
let lastName = $('#lastname-input');
let oldPassword = $('#oldpassword-input');
let newPassword = $('#newpassword-input');
let confirmPassword = $('#confirmpassword-input');
let customSettings = $('#customtheme-input');

$('#save-settings').click(manageSave);
populateInputs();

function populateInputs() {
        firstName.val(Auth.getUser().firstName);
        lastName.val(Auth.getUser().lastName);
        customSettings.val(Auth.getUser().settings);
}

function manageSave() {

    if (!isEmpty(firstName.val()) || !isEmpty(lastName.val()) || !isEmpty(newPassword.val()) || !isEmpty(customSettings.val())) {

        if (!isEmpty(newPassword.val())) {

            if (newPassword !== confirmPassword) {
                console.log("confirm your password");
                newPassword.val('');
                confirmPassword.val('');
                return;
            }

            if (newPassword === oldPassword) {
                console.log("identical passwords");
                oldPassword.val('');
                newPassword.val('');
                confirmPassword.val('');
                return;
            }
        }

        modifySettings(firstName.val(), lastName.val(), newPassword.val(), customSettings.val());
    }
}

function isEmpty(content) {
    return content.trim() === '';
}
