import { ICategoriesUpdate } from "../interfaces/ICategoriesUpdate"


export class CategoriesUpdate implements ICategoriesUpdate {
    constructor(
        public id: string,
        public nameRu: string = "",
        public nameEn: string = "",
        public nameTm: string = "",
        public parrentId: string = ""
    ) {
        this.id = id
        this.nameRu = nameRu
        this.nameEn = nameEn
        this.nameTm = nameTm
        this.parrentId = parrentId
    }
}