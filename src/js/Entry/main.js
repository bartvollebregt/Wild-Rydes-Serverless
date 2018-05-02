"use strict";

import WildRydes from 'WildRydes';

const application = new WildRydes();

$(function onDocReady() {
    $(".btn-menu").on("click",function(event) {
        event.preventDefault();
        $("html").toggleClass("menu-opened");
    });

    $('#signinForm').submit(event => application.getAuth().handleSignin(event,
        $('#emailInputSignin').val(),
        $('#passwordInputSignin').val()
    ));

    $('#registrationForm').submit(event => application.getAuth().handleRegister(event,
        $('#emailInputRegister').val(),
        $('#passwordInputRegister').val(),
        $('#password2InputRegister').val()
    ));

    $('#verifyForm').submit(event => application.handleVerifyEmail(event,
        $('#emailInputVerify').val(),
        $('#codeInputVerify').val()
    ));
});


