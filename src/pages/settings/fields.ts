import { TextFieldProps } from "./settings";

export const Fields: TextFieldProps[] = [
  {
    label: "Почта",
    name: "email",
    value: "",
    ref: "emailRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Логин",
    name: "login",
    value: "",
    ref: "loginRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Имя",
    value: "",
    name: "firstName",
    ref: "firstNameRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Фамилия",
    value: "",
    name: "secondName",
    ref: "secondNameRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Имя в чате",
    value: "",
    name: "displayName",
    ref: "displayNameRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Телефон",
    value: "",
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
    value: "",
    type: "password",
    ref: "oldPasswordRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Новый пароль",
    name: "password",
    value: "",
    type: "password",
    ref: "passwordRef",
    modification: "filled",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
  },
  {
    label: "Повторите новый пароль",
    name: "newPassword",
    value: "",
    type: "password",
    ref: "newPasswordRef",
    inputClassName: "text-field-profile__input",
    labelClassName: "text-field-profile__label",
    onFocus: () => {},
  }
];

export const Links: Record<string, any >[] = [
  {
    href: "/settings/change-data",
    text: "Изменить данные",
    modification:" actions__link_custom",
  },
  {
    href: "/settings/change-password",
    text: "Изменить пароль",
    modification:" actions__link_custom",
  },
  {
    href: "/logout",
    text: "Выйти",
    modification: "link_attention actions__link_custom",
  }
];
