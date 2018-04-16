$(function(){
    $('#inputConfirmPasswordSignUp').change(function() {
        var aBool = isValidatePassword();
        if (aBool){
            //$('#registerForm').submit();
        }
    });

    $('#userSetting').click(function() {
        $('#homePage').hide();
        $('#userSettingPage').show();
        $('#aboutPage').hide();
        $('#favoritePage').hide();
    });

    $('#goAbout').click(function() {
        $('#homePage').hide();
        $('#userSettingPage').hide();
        $('#aboutPage').show();
        $('#favoritePage').hide();
    });

    $('#goHome').click(function() {
        $('#homePage').show();
        $('#userSettingPage').hide();
        $('#aboutPage').hide();
        $('#favoritePage').hide();
    });

    $('#userFavorite').click(function() {
        $('#homePage').hide();
        $('#userSettingPage').hide();
        $('#aboutPage').hide();
        $('#favoritePage').show();
    });

    $('#aboutJson').click(function() {
        //var myJson = getJson('http://localhost:8888/article/');
        //$('#offerJson').text('TEXTE TEST');
        //$('TEXTE TEST').appendTo('#offerJson');
        //$('<p>Text Test</p>').appendTo('#offerJson');
        getJsonPerso('http://localhost:8888/article');
        //$('<p>Text Test</p>').appendTo('#offerJson');
    });

});

function isValidatePassword() {
    var firstInput = $('#inputPasswordSignUp');
    var secondInput = $('#inputConfirmPasswordSignUp');
    var feedback = $('#passwordFeeback');

    firstInput.removeClass('is-invalid');
    secondInput.removeClass('is-invalid');
    firstInput.removeClass('is-valid');
    secondInput.removeClass('is-valid');

    if(firstInput.val() != '' || secondInput.val() != ''){
        if(firstInput.val() == secondInput.val())
        {
            firstInput.addClass('is-valid');
            secondInput.addClass('is-valid');
            feedback.visibility = 'hidden';
            return true;
        }
        else
        {
            firstInput.addClass('form-control is-invalid');
            secondInput.addClass('form-control is-invalid');
            feedback.show();
        }
    }
    return false;
}

function getJsonPerso(url){
    $.ajax({
        url: url,
        dataType: 'json',
        type: "GET",
        success: url.success,
        error: "Erreur",
        complete: url.complete,
        contentType: "text/plain",
        data: url.data
    });

    /*var courses = {};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        courses = JSON.parse(xmlhttp.responseText);
      }
    };
    xmlhttp.send(null);*/
}