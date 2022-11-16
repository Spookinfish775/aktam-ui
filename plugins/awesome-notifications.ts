import Vue from "vue";
import { Plugin } from '@nuxt/types'
import VueAWN from "vue-awesome-notifications";


const accessor: Plugin = ({ app }) => {
    const options = {
        labels: {
            info: app.i18n.t("labels.notification.labels.info"),
            success: app.i18n.t("labels.notification.labels.success"),
            alert: app.i18n.t("labels.notification.labels.alert"),
            warning: app.i18n.t("labels.notification.labels.warning"),
            async: app.i18n.t("labels.notification.labels.async")
        },
        messages: {
            info: app.i18n.t("labels.notification.messages.info"),
            success: app.i18n.t("labels.notification.messages.success"),
            alert: app.i18n.t("labels.notification.messages.alert"),
            warning: app.i18n.t("labels.notification.messages.warning"),
            async: app.i18n.t("labels.notification.messages.async"),
            "async-block": app.i18n.t("labels.notification.messages.asyncBlockMessage")
        },
        position: "bottom-right"
    };

    Vue.use(VueAWN, options);
};

export default accessor
