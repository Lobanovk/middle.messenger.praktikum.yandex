import {Component} from "../../core";

import './fab-button.css';

interface FabButtonProps {
  type: string
  modification: string;
  role: string;
  onClick: () => void;
}

export class FabButton extends Component {
  constructor({ onClick, type = "button", ...props }: FabButtonProps) {
    super({...props, type, events: {
        click: onClick
      }});
  }

  protected render(): string {
    return `
    <button type="{{ type }}" class="fab-button {{ modification }}" role="{{ role }}">
        <div data-slot="1"></div>
    </button>
    `
  }
}