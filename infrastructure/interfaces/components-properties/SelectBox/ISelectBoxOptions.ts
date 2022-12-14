export interface ISelectBoxOptions {
    placeholder?: string
    loadUrl?: string
    dataSource?: any[]
    displayExpr?: string
    valueExpr?: string
    showClearButton?: boolean
    showDropDownButton?: boolean
    openOnFieldClick?: boolean
    readOnly?: boolean
    disabled?: boolean
    searchEnabled?: boolean
    searchExpr?: string
    filter?: any[]
    onItemClick?: (event: any) => void
    onValueChanged?: (event: any) => void
}