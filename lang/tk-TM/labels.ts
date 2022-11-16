import { LocaleMessageObject } from 'vue-i18n/types'

const messages: LocaleMessageObject = {
    userSaveButton: "Ulanyjyny ýazdyryň",
    passwordChangeButton: "Paroly üýtgetmek",
    ruleErrors: {
        basic: "Meýdan gerek",
        password: "Girizilen parollar gabat gelenok",
        emailInvalid: "Poçta dogry bolmaly",
    },
    notificationSucces: "Saklamak üstünlikli boldy",
    notificationError: "Saklamakda ýalňyşlyk ýüze çykdy",

    addresses: {
        addressRu: "Salgysy-Ru",
        addressEn: "Salgysy-EN",
        addressTm: "Salgysy-Tm",
        coordinates: "Koordinatlar",
    },
    buttons: {
        save: "Saklaň",
        add: "Goş",
        logout: "Çykmak",
    },

    shopSaveButton: "Dükany ýazdyryň",

    notification: {
        labels: {
            info: "Maglumat",
            success: "Üstünlikli",
            alert: "Şowsyz",
            warning: "Duýduryş",
            async: "Ýüklenýär",
        },
        messages: {
            info: "Maglumat habar",
            success: "Amal üstünlikli ýerine ýetirildi",
            alert: "Amal ýerine ýetirilende ýalňyşlyk ýüze çykdy",
            warning: "Duýduryş habary",
            async: "Garaşmagyňyzy soraýarys",
            asyncBlockMessage: "Ýüklenýär"
        }
    },

    authPage: {
        title: "Giriş",
        login: "Login",
        password: "Parol",
        rememberMe: "Meni ýatla",
        signIn: "Girmek",
    },
}

export default messages