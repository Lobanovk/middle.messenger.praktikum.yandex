import { LoginFormActionsProps } from "components/login-form-actions";
import { LoginFormInputsWrapperProps } from "components/login-form-inputs-wrapper";
import { TextFieldProps } from "../login/login";

export const LoginFormActionsFields: LoginFormActionsProps = {
  buttonText: "Зарегистрироваться",
  link: {
    text: "Войти",
    href: "/"
  },
};

export const LoginFormInputsWrapper: LoginFormInputsWrapperProps = {
  title: "Зарегистрироваться",
  type: "sign"
};

export const LoginFormInputs: TextFieldProps[] = [
  {
    name: "email",
    type: "email",
    label: "Почта",
    placeholder: "Почта",
    ref: "emailRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
  },
  {
    name: "login",
    type: "text",
    label: "Логин",
    placeholder: "Логин",
    ref: "loginRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
  },
  {
    name: "firstName",
    type: "text",
    label: "Имя",
    placeholder: "Имя",
    ref: "firstNameRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
  },
  {
    name: "secondName",
    type: "text",
    label: "Фамилия",
    placeholder: "Фамилия",
    ref: "lastNameRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
  },
  {
    name: "phone",
    type: "tel",
    label: "Телефон",
    placeholder: "Телефон",
    ref: "phoneRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
  },
  {
    name: "password",
    type: "password",
    label: "Пароль",
    placeholder: "Пароль",
    ref: "passwordRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
  },
  {
    name: "repeatPassword",
    type: "password",
    label: "Пароль (ещё раз)",
    placeholder: "Пароль (ещё раз)",
    ref: "repeatPasswordRef",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
    onFocus: () => {},
  }
];
