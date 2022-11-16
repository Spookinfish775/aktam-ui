import Vue from "vue"
import { BannerType } from "../enums/BannerType"

function BannerTypes(context: Vue) {
    return [
        { id: BannerType.Scrollable, name: context.$t("enums.bannerType.scrollable") },
        { id: BannerType.StaticLarge, name: context.$t("enums.bannerType.staticLarge") },
        { id: BannerType.Vertical, name: context.$t("enums.bannerType.vertical") },
        { id: BannerType.Small, name: context.$t("enums.bannerType.small") },
        { id: BannerType.SubVertical, name: context.$t("enums.bannerType.subVertical") },
        { id: BannerType.Middle, name: context.$t("enums.bannerType.middle") },
    ]
}

export { BannerTypes }