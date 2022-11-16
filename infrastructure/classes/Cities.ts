import { ICities } from "../interfaces/ICities"

export class Cities implements ICities {
    constructor(
        public id?: string,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public districtId: string = "",
    ) {
        this.id = id
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.districtId = districtId
    }
}
