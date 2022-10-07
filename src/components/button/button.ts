import { Component } from "../../core";

import "./button.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export class Button extends Component {
  static componentName = "Button";

  constructor({ text, onClick }: ButtonProps) {
    super({ text, events: { click: onClick } });
  }

  protected render(): string {
    // language = hbs
    return `
    <button class="button button__primary" type="submit">
        {{ text }}
    </button>`
  }
}