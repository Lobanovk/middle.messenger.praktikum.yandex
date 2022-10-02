import { Component } from "core";

import './login.css';

export class Login extends Component {
  static componentName = "Login";

  constructor() {
    super({
      buttonProps: {
        text: "Авторизоваться"
      },
      linkProps: {
        text: "Нет аккаунта?",
        href: "#"
      },
      inputs: [
        {
          name: "login",
          label: "Логин",
          placeholder: "Логин",
          value: "",
          ref: "loginInput",
          modification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "password",
          type: "password",
          label: "Пароль",
          placeholder: "Пароль",
          value: '',
          ref: "passwordInput",
          modification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        }
      ],
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const inputEl = target.querySelector('input[name="login"]') as HTMLInputElement;
        const passwordEl = target.querySelector('input[name="password"]') as HTMLInputElement;

        let passwordProps: Record<string, string> = {
          value: passwordEl.value,
        }
        if (inputEl.value !== "admin" && passwordEl.value !== "admin") {
          passwordProps.errorMessage = "Неверный логин или пароль"
        }
        this.refs.passwordInput.setProps(passwordProps);
        this.refs.loginInput.setProps({
          value: inputEl.value
        })
      },
    });
  }
  protected render(): string {
    // language = hbs
    return `
        {{#LayoutLoginForm 
            title="Вход"
            modification="login" 
            onSubmit=onSubmit 
            buttonProps=buttonProps
            linkProps=linkProps
        }}
          {{#each inputs}}
            {{{ControlledTextField 
              name=this.name 
              type=this.type 
              label=this.label 
              placeholder=this.placeholder
              errorMessage=this.error
              value=this.value
              ref=this.ref
              modifications=this.modification
              inputProps=this.inputProps
            }}}
          {{/each}}
        {{/LayoutLoginForm}}
    `
  }
}