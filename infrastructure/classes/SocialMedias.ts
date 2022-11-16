import { ISocialMedias } from "../interfaces/ISocialMedias";
import { SocialMediaType } from "../enums/SocialMediaType";

export class SocialMedias implements ISocialMedias {
    constructor(
        public socialMediaType: SocialMediaType = SocialMediaType.Instagram,
        public url: string = "",
        public contactId?: string,
        public shopId?: string,
    ) {
        this.socialMediaType = socialMediaType
        this.url = url
        this.contactId = contactId
        this.shopId = shopId
    }
}