import { IUserUpdate } from "../interfaces/IUserUpdate";
import { IAddresses } from "../interfaces/IAddresses";
import { IPhones } from "../interfaces/IPhones";
import { UserRole } from "../enums/UserRole"

export class UserUpdate implements IUserUpdate {
    id: string
    firstName: string
    lastName: string
    email: string
    countryId?: string
    districtId?: string
    cityId?: string
    role: UserRole
    password: string
    confirmPassword: string
    addresses: IAddresses[]
    phoneNumbers: IPhones[]
    constructor(payload?: IUserUpdate) {
        this.id = payload?.id || ""
        this.firstName = payload?.firstName || ""
        this.lastName = payload?.lastName || ""
        this.email = payload?.email || ""
        this.countryId = payload?.countryId || ""
        this.districtId = payload?.districtId || ""
        this.cityId = payload?.cityId || ""
        this.role = payload?.role || UserRole.User
        this.password = payload?.password || ""
        this.confirmPassword = payload?.confirmPassword || ""
        this.addresses = payload?.addresses || []
        this.phoneNumbers = payload?.phoneNumbers || []
    }
    setAddresses(addresses: IAddresses[]) {
        this.addresses = addresses
    }
    setPhoneNumbers(phoneNumbers: IPhones[]) {
        this.phoneNumbers = phoneNumbers
    }
    setCountry(countryId) {
        this.countryId = countryId
    }
    setDistrict(districtId) {
        this.districtId = districtId
    }
    setCity(cityId) {
        this.cityId = cityId
    }
    // constructor(
    //     public id: string,
    //     public firstName: string = "",
    //     public lastName: string = "",
    //     public email: string = "",
    //     // public image?: string,
    //     public countryId?: string,
    //     public districtId?: string,
    //     public cityId?: string,
    //     public role: UserRole = UserRole.User,
    //     public password: string = "",
    //     public confirmPassword: string = "",
    //     public addresses: IAddresses[] = [],
    //     public phoneNumbers: IPhones[] = [],
    // ) {
    //     this.id = id
    //     this.firstName = firstName
    //     this.lastName = lastName
    //     this.email = email
    //     // this.image = image
    //     this.countryId = countryId
    //     this.districtId = districtId
    //     this.cityId = cityId
    //     this.role = role
    //     this.password = password
    //     this.confirmPassword = confirmPassword
    //     this.addresses = addresses
    //     this.phoneNumbers = phoneNumbers
    // }


    // setAddresses(addresses: IAddresses[]) {
    //     this.addresses = addresses
    // }
    // setPhoneNumbers(phoneNumbers: IPhones[]) {
    //     this.phoneNumbers = phoneNumbers
    // }
}