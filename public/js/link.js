
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

  $('#login').click(function (e) {
    e.preventDefault();
    var email = $('#email-sign-in');
    var password = $('#password-sign-in');

    $.post("/signin", 
    {
        email: email.val(), 
        password: password.val()
    }, function(result) {
        console.log(result.email + email.val() + result.password + password.val());

        if(result.email == email.val() && result.password == password.val()) {
            window.location = '/';
        }
        else
            alert('wrong');
    });

  })

  
});

  