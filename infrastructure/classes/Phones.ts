import { IPhones } from "../interfaces/IPhones";

export class Phones implements IPhones {
    constructor(
        // public id: string = "",
        public number: string = "",
    ) {
        // this.id = id
        this.number = number
    }
}