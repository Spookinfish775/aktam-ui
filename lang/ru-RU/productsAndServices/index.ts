import { LocaleMessageObject } from "vue-i18n/types";

const messages: LocaleMessageObject = {
  productDataGrid: {
    productImage: "Фото",
    productName: "Название",
    productCategory: "Категории",
    productPrice: "Цена",
    productDiscountPrice: "Цена по скидке",
    productShop: "Магазин товара",
    createDate: "Дата создания"
  },
  productCard: {
    photos: "Фотографии",
    nameRu: "Название RU",
    nameEn: "Название EN",
    nameTm: "Название TM",
    name: "Название",
    descriptionRu: "Описание RU",
    descriptionEn: "Описание EN",
    descriptionTm: "Описание TM",
    description: "Описание",
    shopId: "Магазин",
    characteristics: "Характеристики",

    namePersonalCharacteristics: "Название персональной характеристики",
    personalCharacteristics: "Персональная характеристика",
    personalCharacteristicObject: {
      value: "Значение",
      priceBonus: "Цена в бонусных баллах",
      price: "Цена",
      discountPrice: "Цена со скидкой"
    },
    categories: "Категории",
    isPaid: "Проплаченный товар",
    saveProduct: "Сохранить товар",
    createProductVariation: "Создать вид товара"
  },
  servicesDataGrid: {
    serviceImage: "Фото",
    serviceName: "Название",
    serviceShop: "Магазин"
  },
  servicesCard: {
    nameRu: "Название Ru",
    nameEn: "Название En",
    nameTm: "Название Tm",
    name: "Название",
    descriptionRu: "Описание Ru",
    descriptionEn: "Описание En",
    descriptionTm: "Описание Tm",
    description: "Описание",
    categories: "Категории",
    shop: "Магазин",
    saveService: "Сохранить услугу"
  }
};

export default messages;
