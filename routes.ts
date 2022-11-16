const catalogs = "/catalogs"
const productsAndServices = "/products-and-services"
const contacts = "/admin/contacts"

export const routes = {
    home: '/admin/',
    pagesNavigation: {
        users: "/admin/users",
        shops: "/admin/shops",
        productsServices: "/admin/products-and-services",
        catalogs: "/admin/catalogs",
        banners: "/admin/banners",
        orders: "/admin/orders",
        ordersHistory: "/admin/orders/history",
        contacts: "/admin/contacts",
    },
    catalogue: {
        index: catalogs,
        categories: `/admin${catalogs}/categories`,
        countries: `/admin${catalogs}/countries`,
        districts: `/admin${catalogs}/districts`,
        cities: `/admin${catalogs}/cities`,
    },
    productsAndServices: {
        index: productsAndServices,
        products: `/admin${productsAndServices}/products`,
        services: `/admin${productsAndServices}/services`,
    },
    contacts: {
        index: contacts,
        categories: `${contacts}/categories`,
        list: `${contacts}/list`
    }

}
