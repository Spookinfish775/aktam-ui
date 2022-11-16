import { LocaleMessageObject } from "vue-i18n/types";

const messages: LocaleMessageObject = {
  userSaveButton: "Сохранить пользователя",
  passwordChangeButton: "Сменить пароль",
  ruleErrors: {
    basic: "Поле обязательно к заполнению",
    password: "Введенные пароли не совпадают",
    emailInvalid: "Почта должна быть валидной"
  },
  notificationSucces: "Сохраненеие прошло успешно",
  notificationError: "При сохранении произошла ошибка",

  addresses: {
    addressRu: "Адрес-Ru",
    addressEn: "Адрес-EN",
    addressTm: "Адрес-Tm",
    coordinates: "Координаты"
  },

  buttons: {
    save: "Сохранить",
    add: "Добавить",
    logout: "Выйти из профиля"
  },

  shopSaveButton: "Сохранить магазин",

  notification: {
    labels: {
      info: "Информация",
      success: "Успех",
      alert: "Неудачно",
      warning: "Предупреждение",
      async: "Загрузка"
    },
    messages: {
      info: "Информационное сообщение",
      success: "Операция успешно завершена",
      alert: "При выполнении операции произошла ошибка",
      warning: "Предупреждающее сообщение",
      async: "Пожалуйста подождите",
      asyncBlockMessage: "Загрузка"
    }
  },

  authPage: {
    title: "Вход в систему",
    login: "Логин",
    password: "Пароль",
    rememberMe: "Запомнить меня",
    signIn: "Войти"
  }
};

export default messages;
