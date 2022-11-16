import Vue from "vue"
import { UserRole } from "../enums/UserRole"

function UserRoles(context: Vue) {
    return [
        { id: UserRole.User, name: context.$t("enums.userRole.user") },
        { id: UserRole.Saller, name: context.$t("enums.userRole.saller") },
        { id: UserRole.Admin, name: context.$t("enums.userRole.admin") },
    ]
}

export { UserRoles }