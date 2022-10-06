import {Component} from "../../core";

import './fab-button.css';

interface FabButtonProps {
  modification: string;
  role: string;
  onClick: () => void;
}

export class FabButton extends Component {
  constructor({ onClick, ...props }: FabButtonProps) {
    super({...props, events: {
        click: onClick
      }});
  }

  protected render(): string {
    return `
    <button class="fab-button {{ modification }}" role="{{ role }}">
        <div data-slot="1"></div>
    </button>
    `
  }
}