import { SelectBoxProperties } from "./SelectBoxProperties"
import { ISelectBoxPropertiesWithLocalData } from '../../interfaces/components-properties/SelectBox/ISelectBoxPropertiesWithLocalData';


export class SelectBoxPropertiesWithLocalData extends SelectBoxProperties {
    dataSource: any
    constructor(options: ISelectBoxPropertiesWithLocalData) {
        super(options)
        this.dataSource = options.dataSource
    }
}