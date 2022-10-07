import {Component} from "../../core";

import './text-field.css';
import {InputProps} from "../input/input";

export interface TextFieldProps extends InputProps {
  label: string;
  value: string;
  className: string;
  modifications: string[];
  inputProps: {
    className: string
  };
  labelProps: {
    className: string;
  };
}

export class TextField extends Component {
  static componentName = "TextField";

  constructor({ type = "text", ...props }: TextFieldProps) {
    super({ ...props, type });
  }

  protected render(): string {
    // language = hbs
    return `
    <div class="text-field {{ className }}">
      {{{Input 
            onInput=onInput
            onBlur=onBlur
            onFocus=onFocus
            type=type
            name=name
            placeholder=placeholder
            value="${this.props.value}"
            className="text-field__input ${this.props?.inputProps?.className}"
            modifications=modifications
      }}}
      {{#if label}} 
              <label class="text-field__label {{ labelProps.className }}" for="{{ name }}">{{ label }}</label>
      {{/if}}
    </div>`
  }
}