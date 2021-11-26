let submitBtn = document.querySelector('#submit');
let submitLink = document.querySelector("a");
var credentials = Math.floor(Math.random() * 10) + 1;

module.exports.otp = credentials


function validate() {

    var userEnteredOTP = document.querySelector("#password").value;

    var valid = false;

    if (credentials == userEnteredOTP) {

        // alert("Logged in successfully");
        submitLink.href = "home.html";
        valid = true;
        break;

    }


    if (valid == false) {
        alert("Log-in failed. OTP invalid");
        submitLink.href = "index.html";
    }
}

submitBtn.addEventListener("click", function () {
    validate();
});