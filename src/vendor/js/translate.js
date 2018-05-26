$(function(){
    var userLang;

    //userLang = navigator.language || navigator.userLanguage; //Detect language browser

    userLang = "fr-FR";
    changeLng(userLang);
    $('#selectLanguage').val(userLang);

    $('#selectLanguage').change(function() {
		userLang = $('#selectLanguage').val();
		changeLng(userLang);
    });
});

i18next.on('languageChanged', () => { updateContent(); }); //L'IDE mettra surement une erreur à cette ligne mais c'est bien la syntaxe de la lib.

i18next.init({
	debug: true,
	resources: //Json format
	{
	    "en-US": {
		    "translation": {
                "tradConnect": "Login",
                "tradCancel": "Cancel",
			    "tradUserSetting": "Account setting",
			    "tradLogout": "Logout",
			    "tradAbout": "About",
			    "tradMail": "Email",
			    "tradUsername": "Username",
                "tradName": "Name",
			    "tradPassword": "Password",
			    "tradConfirmPassword": "Confirm password",
			    "tradConfirmPasswordError": "Password is not same.",
			    "tradBirth": "Date of birth",
			    "tradLogin": "Login to your account",
			    "tradCreateAccount": "Create to your account",
			    "tradRemember": "Remember me",
			    "tradRegister": "Register",
			    "tradFilter": "Filter",
			    "tradAvailable": "Available in store",
			    "tradFavorite": "Favorite",
			    "tradMoneyLogo": "$",
                "tradPrice": "Price",
			    "tradAdditionDate": "Addition date",
			    "tradLike": "Like",
			    "tradDislike": "Dislike",
			    "tradAsc": "Ascending",
			    "tradDesc": "Descending",
				"tradPartner": "Our partners",
                "tradContact": "Contact us",
                "tradOrder" : "Order by",
                "tradSort" : "Sort by",
                "tradAddOffer" : "Add offer",
                "tradAdministration" : "Administration",
                "tradAdd" : "Add",
                "tradUpdate" : "Update"
		    }
		},
		"fr-FR": {
		    "translation": {
			    "tradConnect": "Connexion",
			    "tradCancel": "Annuler",
			    "tradUserSetting": "Paramètre de compte",
			    "tradLogout": "Déconnexion",
			    "tradAbout": "A propos de nous",
			    "tradMail": "Email",
			    "tradUsername": "Nom d'utilisateur",
                "tradName": "Nom",
			    "tradPassword": "Mot de passe",
			    "tradConfirmPassword": "Confirmer le mot de passe",
			    "tradConfirmPasswordError": "Les mots de passe ne sont pas identiques.",
			    "tradBirth": "Date de naissance",
			    "tradLogin": "Connexion à ton compte",
			    "tradCreateAccount": "Création de ton compte",
			    "tradRemember": "Se souvenir de moi",
			    "tradRegister": "S'inscrire",
			    "tradFilter": "Filtre",
			    "tradAvailable": "Disponible en magasin",
			    "tradFavorite": "Favoris",
			    "tradMoneyLogo": "€",
			    "tradPrice": "Prix",
			    "tradAdditionDate": "Date d'ajout",
			    "tradLike": "J'aime",
			    "tradDislike": "Je n'aime pas",
			    "tradAsc": "Croissant",
			    "tradDesc": "Décroisant",
                "tradPartner": "Nos partenaires",
                "tradContact": "Nous contacter",
                "tradOrder" : "Trier par",
                "tradSort" : "Sens du trie",
				"tradAddOffer" : "Ajouter une offre",
                "tradAdministration" : "Administration",
                "tradAdd" : "Ajouter",
                "tradUpdate" : "Mise à jour"
		    }
		}
	}
}, function(err, t) { updateContent(); }
);

function updateContent() {
    $('.tradConnect').text(i18next.t('tradConnect'));
    $('.tradCancel').text(i18next.t('tradCancel'));
    $('.tradUserSetting').text(i18next.t('tradUserSetting'));
    $('.tradLogout').text(i18next.t('tradLogout'));
    $('.tradAbout').text(i18next.t('tradAbout'));
    $('.tradMail').text(i18next.t('tradMail'));
    $('.tradUsername').text(i18next.t('tradUsername'));
    $('.tradName').text(i18next.t('tradName'));
    $('.tradPassword').text(i18next.t('tradPassword'));
    $('.tradConfirmPassword').text(i18next.t('tradConfirmPassword'));
    $('.tradConfirmPasswordError').text(i18next.t('tradConfirmPasswordError'));
    $('.tradBirth').text(i18next.t('tradBirth'));
    $('.tradLogin').text(i18next.t('tradLogin'));
    $('.tradCreateAccount').text(i18next.t('tradCreateAccount'));
    $('.tradRemember').text(i18next.t('tradRemember'));
    $('.tradRegister').text(i18next.t('tradRegister'));
    $('.tradFilter').text(i18next.t('tradFilter'));
    $('.tradAvailable').text(i18next.t('tradAvailable'));
    $('.tradFavorite').text(i18next.t('tradFavorite'));
    $('.tradPrice').text(i18next.t('tradPrice'));
    $('.tradAdditionDate').text(i18next.t('tradAdditionDate'));
    $('.tradLikeDislike').text(i18next.t('tradLike') + " / " + i18next.t('tradDislike'));
    $('.tradDislike').text(i18next.t('tradDislike'));
    $('.tradLike').text(i18next.t('tradLike'));
    $('.tradAsc').text(i18next.t('tradAsc'));
    $('.tradDesc').text(i18next.t('tradDesc'));
    $('.tradPartner').text(i18next.t('tradPartner'));
    $('.tradContact').text(i18next.t('tradContact'));
    $('.tradOrder').text(i18next.t('tradOrder'));
    $('.tradAddOffer').text(i18next.t('tradAddOffer')); //.prop.('label', i18next.t('tradSort'));
    $('.tradAdministration').text(i18next.t('tradAdministration'));
    $('.tradAdd').text(i18next.t('tradAdd'));
    $('.tradUpdate').text(i18next.t('tradUpdate'));

}

function changeLng(lng) {
    i18next.changeLanguage(lng);
}