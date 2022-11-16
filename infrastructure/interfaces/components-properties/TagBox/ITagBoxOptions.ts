export interface ITagBoxOptions {
    selectAllText?: string
    placeholder?: string
    loadUrl?: string
    dataSource?: any[]
    displayExpr?: string
    valueExpr?: string
    showClearButton?: boolean
    readOnly?: boolean
    disabled?: boolean
    searchEnabled?: boolean
    searchExpr?: string
    showSelectionControls?: boolean
    applyValueMode?: string
    showDropDownButton?: boolean
    filter?: any[]
    onItemClick?: (event: any) => void
    onValueChanged?: (event: any) => void
}