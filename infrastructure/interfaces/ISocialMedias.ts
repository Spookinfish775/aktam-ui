import { SocialMediaType } from "../enums/SocialMediaType"

export interface ISocialMedias {
    socialMediaType: number
    url: string
    contactId?: string
    shopId?: string
}