$(function(){
    var userLang;
    //userLang = navigator.language || navigator.userLanguage; //Detect language browser
    userLang = "fr-FR";

    changeLng(userLang);
    $("#selectLanguage").val(userLang);

    $('#selectLanguage').change(function() {
		userLang = $("#selectLanguage").val();
		changeLng(userLang);
    });
});

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
			    "tradDesc": "Descending"
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
			    "tradDesc": "Décroisant"
		    }
		}
	}
}, function(err, t) {
    updateContent();
});

function updateContent() {
    $('.tradConnect').text(i18next.t('tradConnect'));
    $('.tradCancel').text(i18next.t('tradCancel'));
    $('.tradUserSetting').text(i18next.t('tradUserSetting'));
    $('.tradLogout').text(i18next.t('tradLogout'));
    $('.tradAbout').text(i18next.t('tradAbout'));
    $('.tradMail').text(i18next.t('tradMail'));
    $('.tradUsername').text(i18next.t('tradUsername'));
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
    $('.tradLike').text(i18next.t('tradLike'));
    $('.tradDislike').text(i18next.t('tradDislike'));
    $('.tradAsc').text(i18next.t('tradAsc'));
    $('.tradDesc').text(i18next.t('tradDesc'));
}

function changeLng(lng) {
    i18next.changeLanguage(lng);
}

i18next.on('languageChanged', () => { updateContent(); });