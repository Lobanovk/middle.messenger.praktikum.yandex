import { Component } from "core";
import {validation, ValidationKeys} from "../../helpers/validation";

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
        href: "./"
      },
      inputs: [
        {
          name: "email",
          type: "email",
          label: "Почта",
          placeholder: "Почта",
          ref: "emailInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "login",
          type: "text",
          label: "Логин",
          placeholder: "Логин",
          ref: "loginInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "firstName",
          type: "text",
          label: "Имя",
          placeholder: "Имя",
          ref: "firstNameInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "lastName",
          type: "text",
          label: "Фамилия",
          placeholder: "Фамилия",
          ref: "lastNameInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "phone",
          type: "tel",
          label: "Телефон",
          placeholder: "Телефон",
          ref: "phoneInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "password",
          type: "password",
          label: "Пароль",
          placeholder: "Пароль",
          ref: "passwordInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          }
        },
        {
          name: "repeatPassword",
          type: "password",
          label: "Пароль (ещё раз)",
          placeholder: "Пароль (ещё раз)",
          ref: "repeatPasswordInput",
          value: "",
          inputModification: ['filled'],
          inputProps: {
            className: "text-field-login__input"
          },
          onFocus: () => {},
          onBlur: (event: FocusEvent, el: HTMLInputElement, component: Component) => {
            const error = validation(el.name as ValidationKeys, this.refs.passwordInput.getProps().value, el.value);
            component.setProps({
              value: el.value
            });
            component.refs.errorRef.setProps({
              message: error
            })
          }
        }
      ],
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const allRefs = Object.keys(this.refs);
        const errors = allRefs
          .map(key => this.refs[key].getRefs().errorRef.getProps().message)
          .filter(Boolean);
        if (errors.length) {
          return;
        }
        const body = allRefs.map(key => ({
          [this.refs[key].getProps().name]: this.refs[key].getProps().value
        }))
        console.log(body);
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
              value=this.value
              ref=this.ref
              onBlur=this.onBlur
              modifications=this.inputModification
              inputProps=this.inputProps
            }}}
          {{/each}}
        {{/LayoutLoginForm}}`
  }
}