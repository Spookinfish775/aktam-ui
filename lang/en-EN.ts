import { LocaleMessageObject } from 'vue-i18n/types'
import labels from "./en-EN/labels"
import navigation from './en-EN/navigation';
import pageHeader from './en-EN/pageHeader'
import userPage from './en-EN/userPage/index'
import categoriesPage from './en-EN/categoriesPage/index'
import counriesAndCitiesCards from './en-EN/countriesAndCitiesPages/cardsLabels'
import shopPage from "./en-EN/shopPage/index"
import products from "./en-EN/productsAndServices/index"
import banners from "./en-EN/banners/index"
import order from "./en-EN/order"
import contacts from "./en-EN/contacts/index"
import enums from "./en-EN/enums/index"

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
