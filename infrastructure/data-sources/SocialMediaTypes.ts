import Vue from "vue"
import { SocialMediaType } from "../enums/SocialMediaType"

function SocialMediaTypes(context: Vue) {
    return [
        { id: SocialMediaType.Instagram, name: context.$t("enums.socialMediaTypes.instagram") },
        { id: SocialMediaType.Telegram, name: context.$t("enums.socialMediaTypes.telegram") },
        { id: SocialMediaType.YouTube, name: context.$t("enums.socialMediaTypes.youTube") },
        { id: SocialMediaType.Twitter, name: context.$t("enums.socialMediaTypes.twitter") },
        { id: SocialMediaType.Facebook, name: context.$t("enums.socialMediaTypes.facebook") },
        { id: SocialMediaType.TikTok, name: context.$t("enums.socialMediaTypes.tikTok") },

    ]
}

export { SocialMediaTypes }