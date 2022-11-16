import { routes } from "../../routes"

export const productServicesNavigation = (context) => {
    return [
        { id: 1, text: context.$t("navigation.productAndServicesNavigation.products"), icon: "mdi-package-variant-closed", to: routes.productsAndServices.products },
        { id: 2, text: context.$t("navigation.productAndServicesNavigation.services"), icon: "mdi-wrench-outline", to: routes.productsAndServices.services },
    ]
}