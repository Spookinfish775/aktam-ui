import { IAddresses } from "./IAddresses";
import { IPhones } from "./IPhones";
import { ISocialMedias } from "./ISocialMedias"

export interface IShop {
    nameRu: string
    nameEn?: string
    nameTm?: string
    descriptionRu: string
    descriptionEn?: string
    descriptionTm?: string
    email: string
    endStoresPaymentPeriod: string
    countryId: string
    cityId: string
    districtId: string
    userId: string
    phoneNumbers: IPhones[]
    addresses: IAddresses[]
    categoryIds: []
    socialMedias: ISocialMedias[]
}