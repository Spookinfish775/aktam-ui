import { routes } from "../../routes"

export const contactsNavigation = (context) => {
    return [
        { id: 1, text: context.$t("navigation.contactsNavigation.categories"), icon: "mdi-format-list-bulleted", to: routes.contacts.categories },
        { id: 2, text: context.$t("navigation.contactsNavigation.contacts"), icon: "mdi-phone-log-outline", to: routes.contacts.list },
    ]
}