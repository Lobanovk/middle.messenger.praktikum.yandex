import { Component } from "core";

export type IncomingProps = {
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: () => void;
  type: string;
  name: string;
  placeholder: string;
  modification: string;
  value: string;
  className?: string;
  isHidden?: boolean;
}

type ExcludeKeys = "onBlur" | "onFocus" | "onChange";

type Props = Omit<IncomingProps, ExcludeKeys> & ComponentEvents

export class Input extends Component<Props> {
  static componentName = "Input";

  constructor({ onBlur, onFocus, onChange, ...props }: IncomingProps) {
    super({
      ...props,
      events: {
        focus: onFocus,
        blur: onBlur,
        change: onChange
      }
    });
  }

  protected render(): string {
    return `
      <input 
        class="input {{#if modification}}input_{{modification}}{{/if}} {{className}}"
        type="{{type}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        {{#if isHidden}}hidden{{/if}}
      />
    `;
  }
}
