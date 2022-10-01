import {Component} from "../../core";
import {TextFieldProps} from "../text-field/text-field";

interface ControlledTextFieldProps extends TextFieldProps {
  errorMessage: string;
  value: string;
}

export class ControlledTextField extends Component {
  static componentName = "ControlledTextField";

  constructor({ errorMessage = "21345", ...props }: ControlledTextFieldProps) {
    super({ errorMessage, ...props});
  }

  protected render(): string {
    // language = hbs
    return `
      <div>
        {{{TextField 
            name=name 
            label=label 
            placeholder=placeholder
            type=type
            value=value
            onBlur=onBlur
            onInput=onInput
            onFocus=onFocus
        }}}
        {{#if errorMessage}} 
            {{{Error message=errorMessage }}}
        {{/if}}
      </div>
    `
  }
}