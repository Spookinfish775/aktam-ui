import { LocaleMessageObject } from 'vue-i18n/types'

const messages: LocaleMessageObject = {
    cardTitele: "Добавление нового пользователя",
    updateTitle: "Изменение данных пользователя",
    personalInfo: {
        title: "Личная информация",
        firstName: "Имя",
        lastName: "Фамилия",
        email: "Почта",
        photo: "Фото"
    },
    system: {
        title: "Система",
        password: "Пароль",
        confirmPassword: "Подттверждение пароля",
        role: "Роль",
        shops: "Магазины",
    },
    contacts: {
        title: "Контакты",
        country: "Страна",
        city: "Город",
        district: "Регион",
        addresses: "Адреса",
        phoneNumbers: "Номера телефонов"
    },
    saveButton: "Сохранить пользователя"
}

export default messages