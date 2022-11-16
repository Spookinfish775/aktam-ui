import { IProductUpdate } from "../interfaces/IProductsUpdate"
import { ICharacteristicOfProduct } from "../interfaces/ICharacteristicOfProduct"
import { IPersonalCharacteristicOfProduct } from "../interfaces/IPersonalCharacteristicOfProduct"

export class ProductsUpdate implements IProductUpdate {
    constructor(
        public id: string,
        public groupId: string,
        public isMain: boolean,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public descriptionRu: string = "",
        public descriptionEn: string = "",
        public descriptionTm: string = "",
        public createDate: string = "",
        public numberView: number,
        public isPaid: boolean,
        public namePersonalCharacteristics: string = "",
        public shopId: string = "",
        public characteristics: ICharacteristicOfProduct[] = [],
        public personalCharacteristics: IPersonalCharacteristicOfProduct[] = [],
        public categoriesId: [] = [],
    ) {
        this.id = id
        this.groupId = groupId
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.descriptionRu = descriptionRu
        this.descriptionEn = descriptionEn
        this.descriptionTm = descriptionTm
        this.namePersonalCharacteristics = namePersonalCharacteristics
        this.shopId = shopId
        this.characteristics = characteristics
        this.personalCharacteristics = personalCharacteristics
        this.categoriesId = categoriesId
    }
}