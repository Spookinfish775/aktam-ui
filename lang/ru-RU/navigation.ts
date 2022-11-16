import { LocaleMessageObject } from "vue-i18n/types";

const messages: LocaleMessageObject = {
  navCategory: {
    firstDivider: "Управление",
    secondDivider: "Администрирование"
  },
  navigationTitles: {
    users: "Пользователи",
    shops: "Магазины",
    productsServices: "Товары и Услуги",
    catalogs: "Информация",
    banners: "Баннеры",
    orders: "Заказы",
    deliveredOrders: "История заказов",
    contacts: "Справочник"
  },
  rights: "Created by Emelsan",

  catalogueNavigation: {
    categories: "Справочник Категорий",
    country: "Справочник Стран",
    district: "Справочник Регионов",
    city: "Справочник Городов"
  },
  productAndServicesNavigation: {
    products: "Товары",
    services: "Услуги"
  },
  contactsNavigation: {
    categories: "Категории контактов",
    contacts: "Контакты"
  }
};

export default messages;
