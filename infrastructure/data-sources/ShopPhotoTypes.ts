import Vue from "vue"
import { ShopPhotoType } from "../enums/ShopPhotoType"

function ShopPhotoTypes(context: Vue) {
    return [
        { id: ShopPhotoType.Logo, name: context.$t("enums.shopPhotoType.logo") },
        { id: ShopPhotoType.ShopBanner, name: context.$t("enums.shopPhotoType.shopBanner") },
        { id: ShopPhotoType.MobileShopBanner, name: context.$t("enums.shopPhotoType.mobileShopBanner") },
    ]
}

export { ShopPhotoTypes }