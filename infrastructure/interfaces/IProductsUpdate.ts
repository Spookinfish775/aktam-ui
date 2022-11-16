import { ICharacteristicOfProduct } from "./ICharacteristicOfProduct"
import { IPersonalCharacteristicOfProduct } from "./IPersonalCharacteristicOfProduct"

export interface IProductUpdate {
    id: string,
    groupId: string
    isMain: boolean
    nameRu: string
    nameEn?: string
    nameTm?: string
    descriptionRu: string
    descriptionEn?: string
    descriptionTm?: string
    createDate: string
    numberView: number
    isPaid: boolean
    namePersonalCharacteristics: string
    shopId: string
    characteristics: ICharacteristicOfProduct[]
    personalCharacteristics: IPersonalCharacteristicOfProduct[]
    categoriesId: []
}