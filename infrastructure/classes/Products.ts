import { IProduct } from "../interfaces/IProducts"
import { ICharacteristicOfProduct } from "../interfaces/ICharacteristicOfProduct"
import { IPersonalCharacteristicOfProduct } from "../interfaces/IPersonalCharacteristicOfProduct"

export class Products implements IProduct {
    nameRu: string
    nameEn: string
    nameTm: string
    descriptionRu: string
    descriptionEn: string
    descriptionTm: string
    namePersonalCharacteristics: string
    shopId: string
    characteristics: ICharacteristicOfProduct[]
    personalCharacteristics: IPersonalCharacteristicOfProduct[]
    categories: []
    groupId?: string
    constructor(payload?: IProduct) {
        this.nameRu = payload?.nameRu || ""
        this.nameEn = payload?.nameEn || ""
        this.nameTm = payload?.nameTm || ""
        this.descriptionRu = payload?.descriptionRu || ""
        this.descriptionEn = payload?.descriptionEn || ""
        this.descriptionTm = payload?.descriptionTm || ""
        this.namePersonalCharacteristics = payload?.namePersonalCharacteristics || ""
        this.shopId = payload?.shopId || ""
        this.characteristics = payload?.characteristics || []
        this.personalCharacteristics = payload?.personalCharacteristics || []
        this.categories = payload?.categories || []
        this.groupId = payload?.groupId || null
    }
}

// export class Products implements IProduct {
//     constructor(
//         public nameRu: string = "",
//         public nameEn: string = "",
//         public nameTm: string = "",
//         public descriptionRu: string = "",
//         public descriptionEn: string = "",
//         public descriptionTm: string = "",
//         public namePersonalCharacteristics: string = "",
//         public shopId: string = "",
//         public characteristics: ICharacteristicOfProduct[] = [],
//         public personalCharacteristics: IPersonalCharacteristicOfProduct[] = [],
//         public categories: [] = [],
//     ) {
//         this.nameRu = nameRu
//         this.nameEn = nameEn
//         this.nameTm = nameTm
//         this.descriptionRu = descriptionRu
//         this.descriptionEn = descriptionEn
//         this.descriptionTm = descriptionTm
//         this.namePersonalCharacteristics = namePersonalCharacteristics
//         this.shopId = shopId
//         this.characteristics = characteristics
//         this.personalCharacteristics = personalCharacteristics
//         this.categories = categories
//     }
// }
