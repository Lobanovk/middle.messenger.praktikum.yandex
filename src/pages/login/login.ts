import { Component, Router } from "core";
import { LoginFormActionsProps } from "components/login-form-actions";
import { LoginFormInputsWrapperProps } from "components/login-form-inputs-wrapper";
import ControlledTextField, { ControlledTextFieldProps, ControlledTextFieldIncomingProps } from "components/inputs/controlled-text-field";
import {
  LoginFormActionsFields,
  LoginFormInputsWrapper,
  LoginFormInputs
} from "./fields";
import { Store } from "../../core/Store";
import { withStore } from "../../helpers/withStore";
import { login } from "../../services/auth";

export type TextFieldProps = (Partial<ControlledTextFieldIncomingProps> & { ref: string })

type PageProps = {
  router: Router;
  store: Store<AppState>;
}

type Props = {
  inputs: TextFieldProps[],
  loginInputsWrapper: LoginFormInputsWrapperProps,
  loginFormActions: LoginFormActionsProps,
  onSubmit: (event: SubmitEvent) => void;
} & PageProps;

type Refs = {
  loginRef: ControlledTextField,
  passwordRef: ControlledTextField,
}

export class Login extends Component<Props, Refs> {
  static componentName = "Login";

  constructor(props: PageProps) {
    function onBlur(
      _event: FocusEvent,
      el: HTMLInputElement,
      component: Component<ControlledTextFieldProps>
    ) {
      component.setProps({
        value: el.value
      });
    }

    const inputs = LoginFormInputs.map(item => ({...item, onBlur}) as TextFieldProps);
    super({
      ...props,
      loginFormActions: LoginFormActionsFields,
      loginInputsWrapper: LoginFormInputsWrapper,
      inputs,
      onSubmit: event => {
        event.preventDefault();
        const loginData = {
          login: this.refs.loginRef.getProps().value,
          password: this.refs.passwordRef.getProps().value,
        };
        this.props.store.dispatch(login, loginData);
        // const isValid =
        //   this.refs.passwordRef.getProps().value === "admin" &&
        //   this.refs.loginRef.getProps().value === "admin";
        // if (isValid) {
        //   console.log({
        //     login: this.refs.loginRef.getProps().value,
        //     password: this.refs.passwordRef.getProps().value,
        //   });
        //   return;
        // }
        // console.log(this.refs.passwordRef.getRefs());
        // this.refs.passwordRef.getRefs().errorRef.setProps({
        //   message: "Неверный логин или пароль"
        // });
      },
    });
  }

  protected render(): string {
    return `
      {{#Wrapper type="login"}}
        {{#Form className="card card_login" onSubmit=onSubmit}}
          {{#LoginFormInputsWrapper
            type=loginInputsWrapper.type
            title=loginInputsWrapper.title
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
              modification=this.modification
              inputClassName=this.inputClassName
            }}}
          {{/each}}
          {{/LoginFormInputsWrapper}}
          {{{LoginFormActions 
              buttonText=loginFormActions.buttonText 
              link=loginFormActions.link
          }}}
        {{/Form}}
      {{/Wrapper}}
    `;
  }
}

export default withStore(Login);
