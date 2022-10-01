import {Component} from "../../core";

import './error.css';

export interface ErrorProps {
  message: string
}

export class Error extends Component {
  static componentName = "Error";

  constructor({ message }: ErrorProps) {
    super({ message });
  }

  protected render(): string {
    return `
      <div class="error">
        <p class="error_message">{{ message }}</p>
      </div>`
  }
}