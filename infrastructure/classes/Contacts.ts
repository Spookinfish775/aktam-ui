import { IContacts } from "../interfaces/IContacts";
import { IAddresses } from "../interfaces/IAddresses";
import { IPhones } from "../interfaces/IPhones";
import { ISocialMedias } from "../interfaces/ISocialMedias";

export class Contacts implements IContacts {
    constructor(
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public descriptionRu: string = "",
        public descriptionEn: string = "",
        public descriptionTm: string = "",
        public email: string = "",
        public categories: [] = [],
        public addresses: IAddresses[] = [],
        public phoneNumbers: IPhones[] = [],
        public socialMedias: ISocialMedias[] = [],
    ) {
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.descriptionRu = descriptionRu
        this.descriptionEn = descriptionEn
        this.descriptionTm = descriptionTm
        this.email = email
        this.categories = categories
        this.addresses = addresses
        this.phoneNumbers = phoneNumbers
        this.socialMedias = socialMedias
    }
}