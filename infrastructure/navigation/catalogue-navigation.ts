import { routes } from "../../routes"

export const catalogsNavigation = (context) => {
    return [
        { id: 1, text: context.$t("navigation.catalogueNavigation.categories"), icon: "mdi-format-list-text", to: routes.catalogue.categories },
        { id: 2, text: context.$t("navigation.catalogueNavigation.country"), icon: "mdi-map", to: routes.catalogue.countries },
        { id: 3, text: context.$t("navigation.catalogueNavigation.district"), icon: "mdi-city-variant-outline", to: routes.catalogue.districts },
        { id: 4, text: context.$t("navigation.catalogueNavigation.city"), icon: "mdi-domain", to: routes.catalogue.cities },
    ]
}