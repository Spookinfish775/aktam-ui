import { IUserCreate } from "../interfaces/IUserCreate";
import { IAddresses } from "../interfaces/IAddresses";
import { IPhones } from "../interfaces/IPhones";
import { UserRole } from "../enums/UserRole"

export class UserCreate implements IUserCreate {
    constructor(
        public firstName: string = "",
        public lastName: string = "",
        public email: string = "",
        public password: string = "",
        public confirmPassword: string = "",
        public country: string = "",
        public city: string = "",
        public district: string = "",
        // public image?: File,
        public role: UserRole = UserRole.User,
        public addresses: IAddresses[] = [],
        public phoneNumbers: IPhones[] = [],
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.confirmPassword = confirmPassword
        this.country = country
        this.city = city
        this.district = district
        this.role = role
        // this.image = image
        this.addresses = addresses
        this.phoneNumbers = phoneNumbers
    }


    setAddresses(addresses: IAddresses[]) {
        this.addresses = addresses
    }
    setPhoneNumbers(phoneNumbers: IPhones[]) {
        this.phoneNumbers = phoneNumbers
    }
}