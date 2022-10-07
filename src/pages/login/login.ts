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
        href: "sign-in.html"
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
          },
          onFocus: () => {},
          onBlur: (event: FocusEvent, el: HTMLInputElement, component: Component) => {
            component.setProps({
              value: el.value
            })
          },
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
          },
          onFocus: () => {},
          onBlur: (event: FocusEvent, el: HTMLInputElement, component: Component) => {
            component.setProps({
              value: el.value
            })
          },
        }
      ],
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const isValid = Object.keys(this.refs).every(key => this.refs[key].getProps().value === "admin");
        console.log(this.refs);
        if (!isValid) {
          this.refs.passwordInput.getRefs().errorRef.setProps({
            message: "Неверный логин или пароль"
          })
        } else {
          this.refs.passwordInput.getRefs().errorRef.setProps({
            message: ""
          })
          console.log({
            login: this.refs.loginInput.getProps().value,
            password: this.refs.passwordInput.getProps().value,
          })
          window.location.replace('chat.html')
        }
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
              value=this.value
              ref=this.ref
              onBlur=this.onBlur
              onFocus=this.onFocus
              modifications=this.modification
              inputProps=this.inputProps
            }}}
          {{/each}}
        {{/LayoutLoginForm}}
    `
  }
}