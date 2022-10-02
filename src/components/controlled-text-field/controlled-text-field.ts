import {Component} from "../../core";
import {TextFieldProps} from "../text-field/text-field";

interface ControlledTextFieldProps extends TextFieldProps {
  errorMessage: string;
  value: string;
  inputProps: {
    className: string
  };
  labelProps: {
    className: string;
  };
}

export class ControlledTextField extends Component {
  static componentName = "ControlledTextField";

  constructor({ errorMessage = "", ...props }: ControlledTextFieldProps) {
    super({ errorMessage, ...props });
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
            modifications=modifications
            className=className
            inputProps=inputProps
            labelProps=labelProps
        }}}
        {{#if errorMessage}} 
            {{{Error message=errorMessage }}}
        {{/if}}
      </div>
    `
  }
}