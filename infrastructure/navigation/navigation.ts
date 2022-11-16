import { routes } from "../../routes"
import { UserRole } from "../enums/UserRole"

export const navigation = (context, role: UserRole) => {
    const items = [
        { id: 2, text: context.$t("navigation.navigationTitles.shops"), icon: "mdi-home-outline", to: routes.pagesNavigation.shops },
        { id: 3, text: context.$t("navigation.navigationTitles.productsServices"), icon: "mdi-view-grid-outline", to: routes.pagesNavigation.productsServices },
        { id: 4, text: context.$t("navigation.navigationTitles.orders"), icon: "mdi-cart-outline", to: routes.pagesNavigation.orders },
        { id: 7, text: context.$t("navigation.navigationTitles.deliveredOrders"), icon: "mdi-cart-arrow-up", to: routes.pagesNavigation.ordersHistory },

    ]

    if (role === UserRole.Admin) {
        items.push(...[
            { id: 1, text: context.$t("navigation.navigationTitles.users"), icon: "mdi-account-outline", to: routes.pagesNavigation.users },
            { id: 5, text: context.$t("navigation.navigationTitles.catalogs"), icon: "mdi-book-open-outline", to: routes.pagesNavigation.catalogs },
            { id: 6, text: context.$t("navigation.navigationTitles.banners"), icon: "mdi-image-outline", to: routes.pagesNavigation.banners },
            { id: 8, text: context.$t("navigation.navigationTitles.contacts"), icon: "mdi-account-group-outline", to: routes.pagesNavigation.contacts },
        ])
    }

    return items
}