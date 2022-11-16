import { IDistricts } from "../interfaces/IDistricts"

export class Districts implements IDistricts {
    constructor(
        public id?: string,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public countryId: string = "",
    ) {
        this.id = id
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.countryId = countryId
    }
}
