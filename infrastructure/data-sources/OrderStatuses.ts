import Vue from "vue"
import { OrderStatus } from "../enums/OrderStatus"

function OrderStatuses(context: Vue) {
    return [
        { id: OrderStatus.InBasked, name: context.$t("enums.orderStatus.inBasked") },
        { id: OrderStatus.Ordered, name: context.$t("enums.orderStatus.ordered") },
        { id: OrderStatus.Delivered, name: context.$t("enums.orderStatus.delivered") },
    ]
}

export { OrderStatuses }