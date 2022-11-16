import { UserRole } from "../infrastructure/enums/UserRole"

export default function ({ store, redirect }) {
    const user = store.getters["auth/user"];
    if (user.role !== UserRole.Admin) redirect('/admin/auth')
}