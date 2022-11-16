import { LocaleMessageObject } from 'vue-i18n/types'
import labels from "./ru-RU/labels"
import navigation from './ru-RU/navigation'
import pageHeader from './ru-RU/pageHeader'
import userPage from './ru-RU/userPage/index'
import categoriesPage from './ru-RU/categoriesPage/index'
import counriesAndCitiesCards from './ru-RU/countriesAndCitiesPages/cardsLabels'
import shopPage from "./ru-RU/shopPage/index"
import products from "./ru-RU/productsAndServices/index"
import banners from "./ru-RU/banners/index"
import order from "./ru-RU/order"
import contacts from "./ru-RU/contacts/index"
import enums from './ru-RU/enums/index'

const messages: LocaleMessageObject = {
    labels,
    navigation,
    pageHeader,
    userPage,
    categoriesPage,
    counriesAndCitiesCards,
    shopPage,
    products,
    banners,
    order,
    contacts,
    enums,
}
export default messages;
