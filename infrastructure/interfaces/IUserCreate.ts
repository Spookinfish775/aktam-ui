import { IAddresses } from "./IAddresses"
import { IPhones } from "./IPhones"

export interface IUserCreate {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    country: string
    city: string
    district: string
    role: number
    // image?: File
    addresses?: IAddresses[]
    phoneNumbers?: IPhones[]
}

