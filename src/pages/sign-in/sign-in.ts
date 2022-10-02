import { Component } from "core";

export class SignIn extends Component {
  static componentName = "SignIn";

  constructor() {
    super({
      layoutId: "form-layout",
      buttonProps: {
        text: "Зарегистрироваться"
      },
      linkProps: {
        text: "Войти",
        href: "#"
      },
      inputs: [
        {
          name: "email",
          type: "email",
          label: "Почта",
          placeholder: "Почта",
          ref: "emailInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        },
        {
          name: "login",
          type: "text",
          label: "Логин",
          placeholder: "Логин",
          ref: "loginInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        },
        {
          name: "firstName",
          type: "text",
          label: "Имя",
          placeholder: "Имя",
          ref: "firstNameInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        },
        {
          name: "lastName",
          type: "text",
          label: "Фамилия",
          placeholder: "Фамилия",
          ref: "lastNameInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        },
        {
          name: "phone",
          type: "tel",
          label: "Телефон",
          placeholder: "Телефон",
          ref: "phoneInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        },
        {
          name: "password",
          type: "password",
          label: "Пароль",
          placeholder: "Пароль",
          ref: "passwordInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        },
        {
          name: "repeatPassword",
          type: "password",
          label: "Пароль (ещё раз)",
          placeholder: "Пароль (ещё раз)",
          ref: "repeatPasswordInput",
          errorMessage: "",
          value: "",
          inputModification: ['filled'],
          onBlur: (event: FocusEvent) => {
            console.log((event.target as HTMLInputElement).value);
          }
        }
      ],
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        console.log("1234");
      },
    });
  }

  protected render(): string {
    return `
        {{#LayoutLoginForm 
            title="Регистрация"
            modification="sign" 
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
              onBlur=this.onBlur
              modifications=this.inputModification
            }}}
          {{/each}}
        {{/LayoutLoginForm}}`
  }
}