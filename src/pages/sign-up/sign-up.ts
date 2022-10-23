import { Component } from "core";
import { TextFieldProps } from "../login/login";
import { LoginFormInputsWrapperProps } from "../../components/login-form-inputs-wrapper";
import { LoginFormActionsProps } from "../../components/login-form-actions";
import { LoginFormActionsFields, LoginFormInputs, LoginFormInputsWrapper } from "./fields";
import { validation, ValidationKeys } from "../../helpers/validation";
import ControlledTextField, { ControlledTextFieldProps } from "../../components/inputs/controlled-text-field";

type Props = {
  inputs: TextFieldProps[],
  loginInputsWrapper: LoginFormInputsWrapperProps,
  loginFormActions: LoginFormActionsProps,
  onSubmit: (event: SubmitEvent) => void;
}

type KeysRefs =
  "emailRef" |
  "loginRef" |
  "firstNameRef" |
  "lastNameRef" |
  "phoneRef" |
  "passwordRef" |
  "repeatPasswordRef";
type Refs = Record<KeysRefs, ControlledTextField>;

export class SignUp extends Component<Props, Refs> {
  static componentName = "SignUp";

  constructor() {
    const inputs = LoginFormInputs;
    const lastInput = inputs.pop();
    super({
      inputs: [
        ...inputs,
        {
          ...lastInput,
          onBlur: (_event: FocusEvent, el: HTMLInputElement, component: Component<ControlledTextFieldProps>) => {
            const error = validation(el.name as ValidationKeys, this.refs.passwordRef.getProps().value || "", el.value);
            component.setProps({
              value: el.value
            });
            component.getRefs().errorRef.setProps({
              message: error
            });
          }
        }
      ] as TextFieldProps[],
      loginInputsWrapper: LoginFormInputsWrapper,
      loginFormActions: LoginFormActionsFields,
      onSubmit: event => {
        event.preventDefault();
        const errors = Object.values(this.refs)
          .map(ref => ref.getRefs().errorRef.getProps().message)
          .filter(value => Boolean(value));
        console.log(errors);
        if (errors.length) return;
        const body = Object.values(this.refs).map(ref => ({
          [ref.getProps().name as string]: ref.getProps().value
        }));
        console.log(body);
      }
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
