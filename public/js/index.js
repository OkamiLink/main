$(document).ready(function () {
    
    let stars = document.getElementById('stars');
    let moon = document.getElementById('moon');
    let mountains_behind = document.getElementById('mountains_behind');
    let text = document.getElementById('text');
    let btn = document.getElementById('main_btn');
    let mountains_front = document.getElementById('mountains_front');
    let header = document.querySelector('header');

    window.addEventListener('scroll', function(){
        let value = window.scrollY;
        stars.style.left = value * 0.75 + 'px';
        moon.style.top = value * 1.05 + 'px';
        mountains_behind.style.top = value * 0.5 + 'px';
        mountains_front.style.top = value * 0 + 'px';
        header.style.top = value * 0.5 + 'px';
    });

    /**
     * Sign Up Button.
     *
     * TODO: stricter validation.
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

            //reset and reload
            $('body').load('/');
        }
    });

})
