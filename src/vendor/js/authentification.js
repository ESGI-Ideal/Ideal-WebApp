/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */

function getToken2(aMail, aPassword){
    alert("Je suis dans la function");
    $.post("http://localhost:8888/oauth2/token",
        {
            mail: aMail,
            password: aPassword
        },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
}

function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': 'YOUR_CLIENT_ID',
        'redirect_uri': 'YOUR_REDIRECT_URI',
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'};



    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}


function getToken(aMail, aPassword){
//var signin = function() {

    var tokenUrl = "http://localhost:8888/oauth2/token";

    var params = {"grant_type":"password",
        "client_id":"",
        "username":aMail,
        "password":aPassword,
        "secret":"secret_",
        "scope":"nimportequoi"
    };

    $.post(tokenUrl, params).then(doneCallbacksTest, failCallbacksTest);
    //window.localStorage.setItem('theToken', $.post(tokenUrl, params).then(doneCallbacksTest, failCallbacksTest));
    //var signin = $.post(tokenUrl, params).then(doneCallbacksTest, failCallbacksTest);
    //alert(signin);
    /*
    $.post(tokenUrl, params)
        .done(function( data ) {
            alert( "Data Loaded: " + data );
        });
    */

    //alert(signin);

}
function doneCallbacksTest(){
        alert("Token is generate !");
        //alert(window.localStorage);
        //alert(window.localStorage.getItem('theToken'));

    var url = "http://localhost:8888/user/1"
        $.support.cors = true;
        $.getJSON(
            url,
            function(data){
                alert(data.id + data.mail + data.password + data.psw_hash + data.inscription + data.admin);
                /*if (data.length > 1) {
                    $.each(data, function (key, val) {
                        alert(val.id + val.mail + val.password + val.psw_hash + val.inscription + val.admin);
                    });
                }*/
            }
        );
}
function failCallbacksTest(){
    alert("FAIL !");
    //alert(window.localStorage.getItem('theToken'));
}


//window.localStorage.setItem(key, value);
//window.localStorage.getItem(key);


/*
var params = {"grant_type":"password",
        "client_id":"acme1",
        "username":aMail,
        "password":aPassword,
        "secret":"secret_",
        "scope":"nimportequoi"};
 */