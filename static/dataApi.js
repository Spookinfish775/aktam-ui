export const dataApi = {
    users: {
        userCRUD: "/api/User",
        userRegistration: "/api/User/RegistrationUser",
        userChangePassword: "/api/User/ChangePassword",
    },
    image: {
        imageCRUD: "/api/Image"
    },
    address: {
        addressCRUD: "/api/Address"
    },

    category: "/api/Category",
    country: "/api/Country",
    district: "/api/District",
    city: "/api/City",
    shop: "/api/Shop",
    product: "/api/Product",
    storeService: "/api/StoreService",
    banner: "/api/Banner",
    bannerType: "/api/Banner/BannerType",

    orderedProduct: "/api/Product/IsActiveByIds",
    order: "/api/Order",
    orderCurrent: "/api/Order/Current",
    orderDelivered: "/api/Order/Delivered",
    orderChangeStatus: "/api/Order/ChangeStatus",
    auth: "/api/Authenticate/login",
    refreshToken: "/api/Authenticate/refresh-token",
    getUser: "/api/Authenticate/user",

    contactCategory: "/api/ContactCategory",
    contact: "/api/Contact",
}