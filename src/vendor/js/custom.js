var divArray = ['#articlePage', '#userPage', '#favoritePage', '#partnerPage']; //Don't forget add DIV in custom.css

$(function(){
    /*$('#inputConfirmPasswordSignUp').change(function() {
        var aBool = isValidatePassword();
    });*/

    //initArticleJson("http://localhost:8888/article");
    getToken('user@mail.com', 'password');

    $('#goUser').click(function() {
        showDiv(divArray, '#userPage');
    });

    $('#goArticle').click(function() {
        showDiv(divArray, '#articlePage');
    });

    $('#goFavorite').click(function() {
        showDiv(divArray, '#favoritePage');
    });

    $('#goPartner').click(function() {
        showDiv(divArray, '#partnerPage');
    });

    $('#loginButtonTest').click(function() {
        alert("Je lance la function");
        getToken('user@mail.com', 'password');
    });


});

function showDiv(arrayOfDiv, idDiv) {
    for (var id in arrayOfDiv) {
        if (arrayOfDiv[id] === idDiv) { $(arrayOfDiv[id]).show(); }
        else { $(arrayOfDiv[id]).hide(); }
    }
}

function isValidPassword() {
    var firstInput = $('#inputPasswordSignUp');
    var secondInput = $('#inputConfirmPasswordSignUp');
    var feedback = $('#passwordFeeback');

    firstInput.removeClass('is-invalid');
    secondInput.removeClass('is-invalid');
    firstInput.removeClass('is-valid');
    secondInput.removeClass('is-valid');

    if(firstInput.val() !== '' || secondInput.val() !== ''){
        if(firstInput.val() === secondInput.val())
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

function initArticleJson(url){
    $.support.cors = true;
    $.getJSON(
        url,
        function(data){
            if (data.length > 1) {
                $.each(data, function (key, val) {
                    $( "<div/>", { class: "col-lg-4 col-md-6 mb-4", html: articleHTML(val.id, val.name, val.created, val.updated, val.description, val.price) } ).appendTo( '#listOffer' );
                });
            }
        }
    );
}



//{"id":1,"name":"LaveTout","created":null,"updated":null,"description":null,"price":null}

function articleHTML (id, name, created, updated, description, price){
    if(name === null) name = "Item inconnu";
    if(created === null) created = "01/01/2000";
    if(updated === null) updated = "01/01/2000";
    if(description === null) description = "No description...";
    if(price === null) price = "24.99";

    var brefDescription = description.length > 70 ? cutStringBeginingToIndex(description, 80) : description;

    return(
        "<!-- Offer card -->" +
        "<div class='card h-100'>" +
            "<a href='#'><img class='card-img-top' src='http://placehold.it/700x400' alt=''></a>" +
            "<div class='card-body'>" +
                "<h4 class='card-title'>" +
                    "<a href='#' data-toggle='modal' data-target='#offerModal" + id + "'>" + name + "</a>" +
                "</h4>" +
                "<h5>" + price + "€</h5>" +
                "<p class='card-text'>" + brefDescription + "</p>" +
            "</div>" +
            "<div class='card-footer'>" +
                "<small class='text-muted alignLeft'>&#9733; &#9733; &#9733; &#9733; &#9734;</small>" +
                "<small class='text-muted alignRight'>" + updated + "</small>" +
            "</div>" +
        "</div>"+
        articleHTMLmodal(id, name, created, updated, description, price));
}

function articleHTMLmodal(id, name, created, updated, description, price){
    return (
        "<!-- Offer Modal -->" +
        "<div class='modal fade' id='offerModal" + id + "' tabindex='-1' role='dialog' aria-labelledby='offerModalLabel' aria-hidden='true'>" +
            "<div class='modal-dialog modal-dialog-centered modal-lg' role='document'>" +
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<h5 class='modal-title textBold' id='offerModalLabel'>" + name + "</h5>" +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                            "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                    "</div>" +
                    "<div class='modal-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-4'>" +
                                "<a href='#'><img src='http://placehold.it/700x400' alt=''></a>" +
                                "<small class='text-muted alignLeft'>&#9733; &#9733; &#9733; &#9733; &#9734;</small>" +
                                "<small class='text-muted alignRight'>" + updated + "</small>" +
                            "</div>" +
                            "<div class='col-lg-8'>" +
                                "<h5><a target='_blank' href='http://www.google.fr'>" + name + "</a></h5>" +
                                "<h5>" + price + "€</h5>" +
                                "<p class='card-text'>" + description + "</p>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>" +
                        "<a target='_blank' href='http://www.google.fr' id='goToOffer'>" +
                            "<button type='button' class='btn btn-primary'>Go offer !</button>" +
                        "</a>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>");
}

function cutStringBeginingToIndex(myString, myIndex){
    var blankPos = myString.indexOf(' ', myIndex);
    myString = myString.substring(0, blankPos-1) + "(...)";
    return myString;
}