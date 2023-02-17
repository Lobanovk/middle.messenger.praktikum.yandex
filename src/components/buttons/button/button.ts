import { Component } from "core";

type IncomingProps = {
  text: string;
  onClick?: () => void;

  type: string;
}

type ButtonProps = Omit<IncomingProps, "onClick"> & ComponentEvents

export class Button extends Component<ButtonProps>{
  static componentName = "Button";

  constructor({ onClick, type = "primary", ...props }: IncomingProps) {
    super({ ...props, type, events: { click: onClick } });
  }

  protected render(): string {
    return `
      <button class="button button__{{type}}" type="submit">
          {{text}}
      </button>
    `;
  }
}
