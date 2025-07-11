function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            $('#divemail')[0].setAttribute('data-validate', 'Emai is wrong format');
            return false;
        }
        else {
            $('#divemail')[0].setAttribute('data-validate', 'Email is required');
            return false;
        }
    }
    else {
        if ($(input).val().trim() == '') {
            return false;
        }
        else if ($(input).attr('name') == 'username') {
            var txtusername = $(input).val().trim();
            if (CheckContainSpecial(txtusername)) {
                $('#divusername')[0].setAttribute('data-validate', 'Username do not contain special characters');
                return false;
            }
            else if (CheckContainUnicode(txtusername)) {
                $('#divusername')[0].setAttribute('data-validate', 'Username do not contain unicode characters');
                return false;
            }
            else if (!IsNumber(txtusername)) {
                $('#divusername')[0].setAttribute('data-validate', 'Username do not numeric formats');
                return false;
            }
            else {
                $('#divusername')[0].setAttribute('data-validate', 'Username is required');
            };
        }
        else if ($(input).attr('name') == 'password') {
            var txtpassword = $(input).val().trim();
            if (!CheckContainSpecial(txtpassword)) {
                $('#divpassword')[0].setAttribute('data-validate', 'Password must contain at least 1 special character');
                return false;
            }
            else if (!CheckContainUppercaseLetter(txtpassword)) {
                $('#divpassword')[0].setAttribute('data-validate', 'Password must contain at least 1 uppercase character');
                return false;
            }
            else if (!CheckContainAlphanumeric(txtpassword)) {
                $('#divpassword')[0].setAttribute('data-validate', 'Password must contain at least 1 numeric character');
                return false;
            }
            else if (!CheckContainAlphanumeric(txtpassword)) {
                $('#divpassword')[0].setAttribute('data-validate', 'Password must contain at least 1 numeric character');
                return false;
            }
            else {
                $('#divpassword')[0].setAttribute('data-validate', 'Password is required');
            };
        }
        else if ($(input).attr('name') == 'rePassword') {
            var txtRepassword = $(input).val().trim();
            var txtpassword = $('.password').val().trim();
            if (txtpassword != txtRepassword) {
                $('#divrePassword')[0].setAttribute('data-validate', 'The confirmation password is incorrect');
                return false;
            }
            else {
                $('#divrePassword')[0].setAttribute('data-validate', 'Confirm Password is required');
            };
        }
    }
}
function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}
function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}
function init_form_register() {
    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    });
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });
};
