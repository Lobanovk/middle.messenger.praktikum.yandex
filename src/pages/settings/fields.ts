import { TextFieldProps } from "./settings";

export const Fields: TextFieldProps[] = [
  {
    label: "Почта",
    name: "email",
    value: "pochta@yandex.ru",
    ref: "emailRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Логин",
    name: "login",
    value: "ivanivanov",
    ref: "loginRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Имя",
    value: "Иван",
    name: "firstName",
    ref: "firstNameRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Фамилия",
    value: "Иванов",
    name: "lastName",
    ref: "lastNameRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Имя в чате",
    value: "Иван",
    name: "nameInChat",
    ref: "nameInChatRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Телефон",
    value: "+79099673030",
    name: "phone",
    ref: "phoneRef",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  }
];

export const FieldsPassword: TextFieldProps[] = [
  {
    label: "Старый пароль",
    name: "oldPassword",
    value: "A1qwerty",
    type: "password",
    ref: "oldPasswordRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Новый пароль",
    name: "password",
    value: "A1qwerty",
    type: "password",
    ref: "passwordRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Повторите новый пароль",
    name: "repeatPassword",
    value: "A1qwerty",
    type: "password",
    ref: "repeatPasswordRef",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
    onFocus: () => {},
  }
];

export const Links: Record<string, string>[] = [
  {
    href: "/profile-change-data.html",
    text: "Изменить данные",
    modification:" actions__link_custom",
  },
  {
    href: "/profile-change-password.html",
    text: "Изменить пароль",
    modification:" actions__link_custom",
  },
  {
    href: "./",
    text: "Выйти",
    modification: "link_attention actions__link_custom",
  }
];
