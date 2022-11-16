import { IAddresses } from "../interfaces/IAddresses";

export class Addresses implements IAddresses {
    constructor(
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public coordinates: string = "",
    ) {
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.coordinates = coordinates
    }
}