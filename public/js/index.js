/**
 * Created by quiquemz on 11/3/16.
 */
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    signIn();
    register();
}

function signIn() {
    $(".btn-signin").on('click', function (e) {
        e.preventDefault();

        if(validateEmail($("#input-email").val())) {
            $(".form-signin").attr("action", "/login").submit();
        } else {
            alert("Please enter valid email.");
        }
    });
}

function register() {
    $("#btn-register").on('click', function(e) {
        e.preventDefault();
        $(".form-signin").attr("action", "/register").submit();
    });
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password,confirm) {
    var passcheck = password == confirm;
    return passcheck;
}

function userPost() {
    var data = {

    }
}