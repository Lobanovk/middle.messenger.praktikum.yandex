import {Component} from "../../core";

export interface InputProps {
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type: string;
  name: string;
  placeholder: string;
  className: string;
  value: string;
}

export class Input extends Component {
  static componentName = "Input";

  constructor({ onBlur, onFocus, onInput, ...props }: InputProps) {
    super({...props, events: {
        input: onInput,
        focus: onFocus,
        blur: onBlur
      }});
  }

  protected render(): string {
    return `<input class="{{ className }}" type="{{ type }}" name="{{ name }}" placeholder="{{ placeholder }}" value="{{ value }}">`
  }
}