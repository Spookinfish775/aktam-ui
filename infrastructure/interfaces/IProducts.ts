import { ICharacteristicOfProduct } from "./ICharacteristicOfProduct"
import { IPersonalCharacteristicOfProduct } from "./IPersonalCharacteristicOfProduct"

export interface IProduct {
    nameRu: string
    nameEn?: string
    nameTm?: string
    descriptionRu: string
    descriptionEn?: string
    descriptionTm?: string
    namePersonalCharacteristics: string
    shopId: string
    characteristics: ICharacteristicOfProduct[]
    personalCharacteristics: IPersonalCharacteristicOfProduct[]
    categories: []
    groupId?: string
}