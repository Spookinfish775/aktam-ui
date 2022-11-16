import { ICategories } from "../interfaces/ICategories"

export class Categories implements ICategories {
    constructor(
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public parrentId: string = "",
        // public photo?: File
    ) {
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.parrentId = parrentId
        // this.photo = photo
    }
}
