/**
 * Created by quiquemz on 11/3/16.
 */
'use strict';
var data = ("../../../data.json");
var _ = ('lodash');
var today = new Date();

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    populateSelect();
    submitOrder();
    goBack();
}

function populateSelect() {
    var quantityBox = $("#quantity-box");
    var maxQuantity = parseInt(quantityBox.html());
    for(var i = 1; i <= maxQuantity; i++) {
        quantityBox.append($('<option>', {
            value: i,
            text: i
        }));
    }
}

function submitOrder() {
    $("#btn-add-to-cart").on('click', function () {
        storeValues(this);
        location.href = "/customer/order-summary";
    });
}

function goBack() {
    $('.btn-go-back').on('click', function () {
        window.history.back();
    })
}

function storeValues(form) {
    var quantityBox = document.getElementById("quantity-box");
    var quantity = quantityBox.options[quantityBox.selectedIndex].value;
    var priceBox = document.getElementById("price-box");
    var price = priceBox.innerHTML;

    setCookie("field1", quantity);
    setCookie("field2", price);
}

function setCookie(name,value) {
    var expiry = new Date(today.getTime()+30*24*3600*1000);
    document.cookie = name+"="+escape(value)+"; path=/; expires="+expiry.toGMTString();
}

function getCookie(name) {
    var re=new RegExp(name+"=([^;]+)");
    var value=re.exec(document.cookie);
    return(value!=null)?unescape(value[1]):null;
}

function deleteCookie(name) {
    var expired=new Date(today.getTime()-24*3600*1000);
    document.cookie=name+"=null; path=/; expires="+expired.toGMTString();
}

