import { Component } from "core";
import { InputProps } from "../input";

export type IncomingProps = {
  label?: string;
  value: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: string
} & InputProps;

export class TextField extends Component<IncomingProps> {
  static componentName = "TextField";

  constructor({ type = "text", ...props }: IncomingProps) {
    super({ ...props, type });
  }

  protected render(): string {
    return `
    <div class="text-field {{className}}">
        {{{Input
            onInput=onInput
            onBlur=onBlur
            onFocus=onFocus
            type=type
            name=name
            placeholder=placeholder
            value=value
            className="text-field__input ${this.props.inputClassName}"
            modification=modification
        }}}
        {{#if label}}
            <label for="{{name}}" class="text-field__label {{labelClassName}}">{{label}}</label>
        {{/if}}
      </div>
    `;
  }
}
