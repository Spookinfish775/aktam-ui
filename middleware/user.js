import { UserRole } from "../infrastructure/enums/UserRole"

export default function ({ store, redirect }) {

    const isAuthenticated = store.getters["auth/isAuthenticated"]
    const user = store.getters["auth/user"];
    // if (!isAuthenticated)
    //     redirect("/auth")
    if (!isAuthenticated) {
        redirect("/admin/auth")
    } else if (user.role === UserRole.User) {
        redirect('/admin/auth')
    }



    // if (user.role === UserRole.User) 
}