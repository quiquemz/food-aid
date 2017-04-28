$(document).ready(function() {
    initializePage();
});

function initializePage() {
    console.log('options javascript connected');
    $('.btn-go-back').on('click', function () {
        window.history.back();
    });
    submit();
}

function submit() {
    $('#submit-platform-btn').on('click', function (e) {
        e.preventDefault();
        $(".form-submit-platform").attr("action", "/retailer/options").submit();
    });
}
$(document).on('click', '#submit-btn', function(){
    var name = document.getElementById("person_name").value;
});
