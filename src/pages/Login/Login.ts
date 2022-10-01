import { Component } from "core";

export class Login extends Component {
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
      loginValue: "",
      passwordValue: "",
      errorMessage: "",
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const inputEl = target.querySelector('input[name="login"]') as HTMLInputElement;
        const passwordEl = target.querySelector('input[name="password"]') as HTMLInputElement;

        let props: Record<string, string> = {
          loginValue: inputEl.value,
          passwordValue: passwordEl.value,
        }
        if (inputEl.value !== "admin" && passwordEl.value !== "admin") {
          props.errorMessage = "Неверный логин или пароль"
        } else {
          props.errorMessage = "";
        }

        this.setProps(props);
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
          {{{TextField 
              name="login" 
              label="Логин" 
              placeholder="Логин" 
              value=loginValue
              ref="loginInput"
          }}}
          {{{ControlledTextField 
              name="password" 
              type="password" 
              label="Пароль" 
              placeholder="Пароль"
              errorMessage=errorMessage
              value=passwordValue
              ref="passwordInput"
          }}}
        {{/LayoutLoginForm}}
    `
  }
}