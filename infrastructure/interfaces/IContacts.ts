import { IAddresses } from "./IAddresses";
import { IPhones } from "./IPhones";
import { ISocialMedias } from "./ISocialMedias"

export interface IContacts {
    nameRu: string
    nameEn: string
    nameTm: string
    descriptionRu: string
    descriptionEn: string
    descriptionTm: string
    email: string
    categories: []
    addresses: IAddresses[]
    phoneNumbers: IPhones[]
    socialMedias: ISocialMedias[]
}