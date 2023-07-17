let allLow = "abcdefghijklmnopqrstuvwxyz";
let allUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNum = "0123456789";
let allSymb = "~!@#$%^&*";

$(document).ready(() => {
    document.addEventListener('input', () => {
        $('#rangeValue').text($('#passLength').val());
    })

    $('#passwordForm').submit((event) => {
        event.preventDefault();
        $('#copyPassIcon').addClass('bi-clipboard');
        $('#copyPassIcon').removeClass('bi-check-lg');
        $('#copyPassIcon').attr('title', 'Copy password');
        $('#password').val(generatePassword());
    })

    $('#copyPass').click(() => {
        if($('#password').val()) {
            navigator.clipboard.writeText($('#password').val());
            $('#copyPassIcon').removeClass('bi-clipboard');
            $('#copyPassIcon').addClass('bi-check-lg');
            $('#copyPassIcon').attr('title', 'Copy password');
        }
    })
});

function generatePassword() {
    let allChars = "";
    let password = "";

    allChars += $('#incLow').is(':checked') ? allLow : "";
    allChars += $('#incUp').is(':checked') ? allUp : "";
    allChars += $('#incNum').is(':checked') ? allNum : "";
    allChars += $('#incSymb').is(':checked') ? allSymb : "";

    let i = 1;

    while (i <= $('#passLength').val()) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }
    return password;
}