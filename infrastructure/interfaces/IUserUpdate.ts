
import { IAddresses } from "./IAddresses"
import { IPhones } from "./IPhones"

export interface IUserUpdate {
    id: string
    firstName: string
    lastName: string
    email: string
    // image?: string
    countryId?: string
    districtId?: string
    cityId?: string
    role: number
    password: string
    confirmPassword: string
    addresses?: IAddresses[]
    phoneNumbers?: IPhones[]
}

