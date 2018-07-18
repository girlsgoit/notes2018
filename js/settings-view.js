

$('#save-settings').click(putSettings);



function putSettings() {
    let firstName = $('#firstname-input').val();
    let lastName = $('#lastname-input').val();
    let oldPassword = $('#oldpassword-input').val();
    let newPassword = $('#newpassword-input').val();
    let confirmPassword = $('#confirmpassword-input').val();
    let customTheme = $('#customtheme-input').val();

    if (newPassword.length != 0) {
        if (newPassword === confirmPassword) {
            if (oldPassword != newPassword) {
                modifySettings(firstName, lastName, newPassword, customTheme);
            } else {
                console.log("identical passwords");
                $('#oldpassword-input').val('');
                $('#newpassword-input').val('');
                $('#confirmpassword-input').val('');
            }
        } else {
            console.log("confirm your password");
            $('#newpassword-input').val('');
            $('#confirmpassword-input').val('');
        }
    } 

}
// function redirect (){
//     $(location).attr("href", "../dashboard.html");
// }
// function myFunction(){
//     putSettings();
//     redirect();

// }


