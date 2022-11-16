import { IPersonalCharacteristicOfProduct } from "../interfaces/IPersonalCharacteristicOfProduct"

export class PersonalCharacteristicOfProduct implements IPersonalCharacteristicOfProduct {
    constructor(
        public value: string = "",
        public priceBonus: number = null,
        public price: number = null,
        public discountPrice: number = null,
    ) {
        this.value = value
        this.priceBonus = priceBonus
        this.price = price
        this.discountPrice = discountPrice
    }
}