import {Component} from "../../core";

import './error.css';

export interface ErrorProps {
  message: string
}

export class Error extends Component {
  static componentName = "Error";

  constructor() {
    super({ message: "" });
  }

  protected render(): string {
    let content = this.props.message ? '<p class="error_message">{{ message }}</p>' : '';
    return `
      <div class="error">
        ${content}
      </div>`
  }
}