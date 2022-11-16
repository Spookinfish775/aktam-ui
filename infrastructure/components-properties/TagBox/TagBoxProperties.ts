import { ITagBoxOptions } from '../../../infrastructure/interfaces/components-properties/TagBox/ITagBoxOptions';

const defaultOptions = {
    displayExpr: "name",
    valueExpr: "id",
    showClearButton: true,
    disabled: false,
    readOnly: false,
    searchEnabled: true,
    searchExpr: "name",
    showSelectionControls: true,
    applyValueMode: "instantly",
    showDropDownButton: true,
}
export class TagBoxProperties {
    selectAllText: string = "Выбрать все"
    placeholder: string = ""
    displayExpr: string
    valueExpr: string
    dataSource: any
    showClearButton: boolean
    readOnly: boolean
    disabled: boolean
    searchEnabled: boolean
    searchExpr: string
    showSelectionControls: boolean
    showDropDownButton: boolean
    applyValueMode: string
    onItemClick?: (event: any) => void
    onValueChanged?: (event: any) => void
    constructor(options: ITagBoxOptions) {
        options = Object.assign({}, defaultOptions, options)
        this.displayExpr = options?.displayExpr
        this.valueExpr = options?.valueExpr
        this.showClearButton = options?.showClearButton
        this.disabled = options?.disabled
        this.readOnly = options?.readOnly
        this.searchEnabled = options?.searchEnabled
        this.searchExpr = options?.searchExpr
        this.showSelectionControls = options?.showSelectionControls
        this.applyValueMode = options?.applyValueMode
        this.onItemClick = options?.onItemClick
        this.onValueChanged = options?.onValueChanged
    }
}