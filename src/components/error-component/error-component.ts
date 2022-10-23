import { Component } from "core";

export type Props = {
  message: string
}

export class ErrorComponent extends Component<Props> {
  static componentName = "ErrorComponent";

  constructor() {
    super({ message: "" });
  }

  protected render(): string {
    const content = this.props.message ? "<p class=\"error_message\">{{message}}</p>" : "";
    return `
      <div class="error">
        ${content}
      </div>`;
  }
}
