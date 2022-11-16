import { LocaleMessageObject } from "vue-i18n/types";

const messages: LocaleMessageObject = {
  productDataGrid: {
    productImage: "Photo",
    productName: "Name",
    productCategory: "Categories",
    productPrice: "Price",
    productDiscountPrice: "Discount price",
    productShop: "Product Store",
    createDate: "Create date"
  },
  productCard: {
    photos: "Photos",
    nameRu: "Name RU",
    nameEn: "Name EN",
    nameTm: "Name TM",
    name: "Name ",
    descriptionRu: "Description RU",
    descriptionEn: "Description EN",
    descriptionTm: "Description TM",
    description: "Description",
    shopId: "Shop",
    characteristics: "Characteristics",
    namePersonalCharacteristics: "Name of the personal characteristic",
    personalCharacteristics: "Personal characteristic",
    personalCharacteristicObject: {
      value: "Value",
      priceBonus: "Price in bonus points",
      price: "Price",
      discountPrice: "Discount price"
    },
    categories: "Categories",
    isPaid: "Paid product",
    saveProduct: "Save product",
    createProductVariation: "Create product variation"
  },
  servicesDataGrid: {
    serviceImage: "",
    serviceName: "",
    serviceShop: ""
  },
  servicesCard: {
    nameRu: "Name Ru",
    nameEn: "Name En",
    nameTm: "Name Tm",
    name: "Name",
    descriptionRu: "Description Ru",
    descriptionEn: "Description En",
    descriptionTm: "Description Tm",
    description: "Description",
    categories: "Categories",
    shop: "Shop",
    saveService: "Save the service"
  }
};

export default messages;
