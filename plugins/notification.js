import Vue from 'vue'

import BaseNotification from "../components/global-components/notification.vue"

export default (context, inject) => {
    function showNotification(ctx, message) {
        let notify = Vue.extend(BaseNotification)
        let instance = new notify({
            parent: ctx
        })
        instance.$mount()
        ctx.$root.$el.appendChild(instance.$el)
        return instance
    }
    inject("notification", showNotification)
}