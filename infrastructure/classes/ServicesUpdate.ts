import { IServiceUpdate } from "../interfaces/IServiceUpdate"

export class ServicesUpdate implements IServiceUpdate {
    constructor(
        public id: string,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public descriptionRu: string = "",
        public descriptionEn: string = "",
        public descriptionTm: string = "",
        public categoriesId: [] = [],
        public shopId: string = "",
    ) {
        this.id = id
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.descriptionRu = descriptionRu
        this.descriptionEn = descriptionEn
        this.descriptionTm = descriptionTm
        this.categoriesId = categoriesId
        this.shopId = shopId
    }
}