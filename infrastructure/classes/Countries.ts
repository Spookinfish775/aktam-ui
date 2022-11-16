import { ICountries } from "../interfaces/ICountries"

export class Countries implements ICountries {
    constructor(
        public id?: string,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
    ) {
        this.id = id
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
    }
}
