$(document).ready(function () {

    // TODO: howl and add to database then reload body.
    $('#submit-howl').click(function () {
        var howl = $("#post-howl");

        $.get('/howl', {howl:howl.val()},function(data, status) {});
        $('body').load('/profile');
    });

})