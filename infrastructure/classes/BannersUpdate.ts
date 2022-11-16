import { IBannerUpdate } from "../interfaces/IBannerUpdate"
import { BannerType } from "../enums/BannerType"

export class BannersUpdate implements IBannerUpdate {
    constructor(
        public id: string,
        public bannerType: BannerType,
        public url: string = "",
        public shopId: string = "",
    ) {
        this.id = id
        this.bannerType = bannerType
        this.url = url
        this.shopId = shopId
    }
}