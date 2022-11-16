import { IShop } from "./IShops"
import { IUserUpdate } from "./IUserUpdate"

export interface IOrder {
    id: string
    firstName?: string
    lastName?: string
    addressUnauthorizedUser?: string
    phoneNumberUnauthorizedUser?: string
    countPersonalCharacteristics: []
    created: string
    orderNumber: string
    orderStatus: number
    shop: IShop
    shopId: string
    totalPrice: number
    user?: IUserUpdate
    userId?: string
}