import {Component} from "../../core";

import './fab-button.css';

export class FabButton extends Component {
  constructor({}) {
    super({});
  }

  protected render(): string {
    debugger;
    return `
    <button class="fab-button {{ modification }}" role="{{ role }}">
        {{{ children }}}
    </button>
    `
  }
}