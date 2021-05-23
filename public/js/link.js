
$(document).ready(function () {
    /**
     * Sign Up Button.
     *
     *
     */
   $('#signup').click(function () {
    var firstname = $('#firstname');
    var lastname = $('#lastname');
    var email = $('#email');
    var password = $('#password');
    var id;
    var err = false;

    if (firstname[0].value.length == 0 || 
        lastname[0].value.length == 0 || 
        email[0].value.length == 0 ||
        password[0].value.length == 0)
        err = true;
    
    if (err) {
        alert('err');
    }

    else {
        //add to database
        $.post('/signup', 
        {
            firstname: firstname.val(), 
            lastname: lastname.val(), 
            email: email.val(),
            password: password.val(),
        }, function(result){});
    }
  });


  $('#login').click(function () {
    var email = $('#email-sign-in');
    var password = $('#password-sign-in');

    $.post("/signin", {email: email.val()}, function(result) {
        if(result.refno == $('#refno').val()) {
            $('#refno').css("background-color", "#FF0000");
            $('#error').text("Reference number already in the database");
            $('#submit').prop('disabled', false);
        }
        else {
            $('#refno').css("background-color", "#E3E3E3");
            $('#error').text("");
            $('#submit').removeAttr("disabled");
        }
    });

    
  })


});

  