import {Component} from "../../core";

import './input.css';

export interface InputProps {
  onInput?: (event: InputEvent, val?: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type: string;
  name: string;
  placeholder: string;
  modifications: string[];
  value: string;
  className?: string;
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
    // language = hbs
    return `<input 
              class="input {{#each modifications}}input_{{ this }}{{/each}} {{ className }}" 
              type="{{ type }}" 
              name="{{ name }}" 
              placeholder="{{ placeholder }}" 
              value="{{ value }}"
            >`
  }
}