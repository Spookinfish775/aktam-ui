export default function ({ store, redirect }) {
    const isAuthenticated = store.getters["auth/isAuthenticated"]
    if (!isAuthenticated)
        redirect("/admin/auth")
}