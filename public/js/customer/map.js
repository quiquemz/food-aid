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
    google.maps.event.addDomListener(window, 'load', initialize);
    goBack();
}

function goBack() {
    $('.btn-go-back').on('click', function () {
        window.history.back();
    })
}

/* Google Maps */
var Center = new google.maps.LatLng(32.85, -117.207);
var directionsDisplay;
var map;
var directionsService = new google.maps.DirectionsService();

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var properties = {
        center: Center,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById("map"), properties);
    directionsDisplay.setMap(map);

    Route();
}

function Route() {
    var start = new google.maps.LatLng(32.880, -117.234);
    var end = new google.maps.LatLng(32.8214507, -117.179911);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            alert("couldn't get directions:" + status);
        }
    });
}
