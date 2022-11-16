import { IBanner } from "../interfaces/IBanner"
import { BannerType } from "../enums/BannerType"

export class Banners implements IBanner {
    constructor(
        public bannerType: BannerType = BannerType.Scrollable,
        public url: string = "",
        public shopId: string = "",
    ) {
        this.bannerType = bannerType
        this.url = url
        this.shopId = shopId
    }
}