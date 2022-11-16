import { ISelectBoxOptions } from './ISelectBoxOptions';

export interface ISelectBoxPropertiesWithDataSource extends ISelectBoxOptions {
    loadUrl: string,
    key?: string
}