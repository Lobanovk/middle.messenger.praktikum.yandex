import { LoginFormActionsProps } from "../../components_v1/layouts/login-form-actions";
import { LoginFormInputsWrapperProps } from "../../components_v1/layouts/login-form-inputs-wrapper";
import { TextFieldProps } from "./login";

export const LoginFormActionsFields: LoginFormActionsProps = {
  buttonText: "Авторизоваться",
  link: {
    text: "Нет аккаунта?",
    href: "#"
  },
};

export const LoginFormInputsWrapper: LoginFormInputsWrapperProps = {
  title: "Вход",
  type: "login"
};

export const LoginFormInputs: TextFieldProps = [
  {
    name: "login",
    type: "text",
    label: "Логин",
    placeholder: "Логин",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
    ref: "loginRef",
    onFocus: () => {},
  },
  {
    name: "password",
    type: "password",
    label: "Пароль",
    placeholder: "Пароль",
    value: "",
    modification: "filled",
    inputClassName: "text-field-login__input",
    ref: "passwordRef",
    onFocus: () => {}
  }
];
