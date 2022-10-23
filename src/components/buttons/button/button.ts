import { Component } from "core";

type IncomingProps = {
  text: string;
  onClick?: () => void;
}

type ButtonProps = Omit<IncomingProps, "onClick"> & ComponentEvents

export class Button extends Component<ButtonProps>{
  static componentName = "Button";

  constructor({ onClick, ...props }: IncomingProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
      <button class="button button__primary" type="submit">
          {{text}}
      </button>
    `;
  }
}
