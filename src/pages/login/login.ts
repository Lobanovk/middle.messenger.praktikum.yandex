import { Component } from "core";
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
import { Screens } from "../../helpers/screenList";
import { replaceTags } from "../../helpers/validation";

export type TextFieldProps = (Partial<ControlledTextFieldIncomingProps> & { ref: string })

type PageProps = {
  appIsInit: AppState["appIsInit"],
  login: (data: Record<string, string>) => Store<AppState>
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
        value: replaceTags(el.value)
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
        const loginData: Record<string, string> = {
          login: this.refs.loginRef.getProps().value as string,
          password: this.refs.passwordRef.getProps().value as string,
        };
        this.props.login(loginData);
        // TODO - обработка ошибок запроса
      },
    });
  }

  componentDidMount(_props: Props) {
    if (this.props.appIsInit) {
      window.router.go(Screens.Messenger);
    }
    // if (this.props.store.getState().appIsInit) {
    //   window.router.go(Screens.Messenger);
    // }
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

export default withStore(Login)(
  store => ({
    appIsInit: store.getState().appIsInit,
  }),
  store => ({
    login: (data: Record<string, string>) => store.dispatch(login, data)
  })
);
