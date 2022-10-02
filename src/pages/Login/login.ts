import { Component } from "core";

export class Login extends Component {
  static componentName = "Login";

  constructor() {
    super({
      layoutId: "form-layout",
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
        },
        {
          name: "password",
          type: "password",
          label: "Пароль",
          placeholder: "Пароль",
          value: '',
          ref: "passwordInput"
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
    console.log(this.refs);
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
            }}}
          {{/each}}
        {{/LayoutLoginForm}}
    `
  }
}