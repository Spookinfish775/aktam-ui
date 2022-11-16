import { LocaleMessageObject } from 'vue-i18n/types'
import labels from "./tk-TM/labels"
import navigation from "./tk-TM/navigation"
import pageHeader from './tk-TM/pageHeader'
import userPage from './tk-TM/userPage/index'
import categoriesPage from './tk-TM/categoriesPage/index'
import counriesAndCitiesCards from './tk-TM/countriesAndCitiesPages/cardsLabels'
import shopPage from "./tk-TM/shopPage/index"
import products from "./tk-TM/productsAndServices/index"
import banners from "./tk-TM/banners/index"
import order from "./tk-TM/order"
import contacts from "./tk-TM/contacts/index"
import enums from './tk-TM/enums/index'


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
