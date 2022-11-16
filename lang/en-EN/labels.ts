import { LocaleMessageObject } from 'vue-i18n/types'

const messages: LocaleMessageObject = {
    userSaveButton: "Save user",
    passwordChangeButton:"Change password",
    ruleErrors: {
        basic: "The field is required",
        password: "The entered passwords do not match",
        emailInvalid: "Mail must be valid",
    },
    notificationSucces: "Save was successful",
    notificationError: "An error occurred while saving",

    addresses: {
        addressRu: "Address-Ru",
        addressEn: "Address-EN",
        addressTm: "Address-Tm",
        coordinates: "Coordinates",
    },
    buttons: {
        save: "Save",
        add: "Add",
        logout: "Logout",
    },

    shopSaveButton: "Save store",

    notification: {
        labels: {
            info: "Information",
            success: "Success",
            alert: "Unsuccessful",
            warning: "Warning",
            async: "Loading",
        },
        messages: {
            info: "Information message",
            success: "Operation completed successfully",
            alert: "An error occurred while performing the operation",
            warning: "Warning message",
            async: "Please wait",
            asyncBlockMessage: "Loading"
        }
    },

    authPage: {
        title: "Signing in",
        login: "Login",
        password: "Password",
        rememberMe: "Remember me",
        signIn: "Sign In",
    },
}

export default messages