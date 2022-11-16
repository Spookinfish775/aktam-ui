import { ICharacteristicOfProduct } from "../interfaces/ICharacteristicOfProduct"

export class CharacteristicOfProduct implements ICharacteristicOfProduct {
    constructor(
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public valueRu: string = "",
        public valueEn: string = "",
        public valueTm: string = "",
    ) {
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.valueRu = nameRu
        this.valueEn = nameEn
        this.valueTm = nameTm
    }
}