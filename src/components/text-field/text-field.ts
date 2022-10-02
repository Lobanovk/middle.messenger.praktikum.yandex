import {Component} from "../../core";

import './text-field.css';
import {InputProps} from "./input";

export interface TextFieldProps extends InputProps {
  label: string;
  value: string;
}

export class TextField extends Component {
  static componentName = "TextField";

  constructor({ type = "text", ...props }: TextFieldProps) {
    super({ ...props, type });
  }

  protected render(): string {
    // language = hbs
    return `
    <div class="text-field">
      {{{Input 
            onInput=onInput
            onBlur=onBlur
            onFocus=onFocus
            type=type
            name=name
            placeholder=placeholder
            value="${this.props.value}"
            className="text-field__input"
      }}}
      <label class="text-field__label" for="{{ name }}">{{ label }}</label>
    </div>`
  }
}