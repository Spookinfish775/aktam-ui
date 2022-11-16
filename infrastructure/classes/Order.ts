import { IOrder } from "../interfaces/IOrder";
import { IShop } from "../interfaces/IShops";
import { IUserUpdate } from "../interfaces/IUserUpdate";
import { OrderStatus } from "../enums/OrderStatus";

export class Order implements IOrder {
    constructor(
        public id: string,
        public firstName: string = "",
        public lastName: string = "",
        public addressUnauthorizedUser: string = "",
        public phoneNumberUnauthorizedUser: string = "",
        public countPersonalCharacteristics: [] = [],
        public created: string = "",
        public orderNumber: string = "",
        public orderStatus: OrderStatus = OrderStatus.Ordered,
        public shop: IShop = null,
        public shopId: string = null,
        public totalPrice: number = null,
        public user: IUserUpdate = null,
        public userId: string = null,
    ) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.addressUnauthorizedUser = addressUnauthorizedUser
        this.phoneNumberUnauthorizedUser = phoneNumberUnauthorizedUser
        this.countPersonalCharacteristics = countPersonalCharacteristics
        this.created = created
        this.orderNumber = orderNumber
        this.orderStatus = orderStatus
        this.shop = shop
        this.shopId = shopId
        this.totalPrice = totalPrice
        this.user = user
        this.userId = userId
    }
}
