import DataSource from "devextreme/data/data_source";
import Vue from 'vue'

import { SelectBoxProperties } from "./SelectBoxProperties"
import { ISelectBoxPropertiesWithDataSource } from '../../interfaces/components-properties/SelectBox/ISelectBoxPropertiesWithDataSource'


export class SelectBoxPropertiesWithDataSource extends SelectBoxProperties {
    dataSource: DataSource
    constructor(context: Vue, options: ISelectBoxPropertiesWithDataSource) {
        super(options)
        this.dataSource = new DataSource({
            store: context.$dxStore({
                key: options?.key || "id",
                loadUrl: options.loadUrl,
            }),
            filter: options?.filter || null
        })
    }
}