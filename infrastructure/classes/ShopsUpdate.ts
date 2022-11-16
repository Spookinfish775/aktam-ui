import { IShopUpdate } from "../interfaces/IShopUpdate";
import { IAddresses } from "../interfaces/IAddresses";
import { IPhones } from "../interfaces/IPhones";
import { ISocialMedias } from "../interfaces/ISocialMedias";

export class ShopsUpdate implements IShopUpdate {
    constructor(
        public id: string,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public descriptionRu: string = "",
        public descriptionEn: string = "",
        public descriptionTm: string = "",
        public email: string = "",
        public endStoresPaymentPeriod: string = "",
        public countryId: string = "",
        public cityId: string = "",
        public districtId: string = "",
        public userId: string = "",
        public phoneNumbers: IPhones[] = [],
        public addresses: IAddresses[] = [],
        public categoryIds: [] = [],
        public socialMedias: ISocialMedias[] = [],
    ) {
        this.id = id
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.descriptionRu = descriptionRu
        this.descriptionEn = descriptionEn
        this.descriptionTm = descriptionTm
        this.email = email
        this.endStoresPaymentPeriod = endStoresPaymentPeriod
        this.countryId = countryId
        this.cityId = cityId
        this.districtId = districtId
        this.userId = userId
        this.phoneNumbers = phoneNumbers
        this.addresses = addresses
        this.categoryIds = categoryIds
        this.socialMedias = socialMedias
    }

    setAddresses(addresses: IAddresses[]) {
        this.addresses = addresses
    }
    setPhoneNumbers(phoneNumbers: IPhones[]) {
        this.phoneNumbers = phoneNumbers
    }
    setSocialMedias(socialMedias: ISocialMedias[]) {
        this.socialMedias = socialMedias
    }
}