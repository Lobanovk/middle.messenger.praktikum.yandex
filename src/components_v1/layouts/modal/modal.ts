import { Component } from "core";

export class Modal extends Component<object>{
  static componentName = "Modal";

  constructor() {
    super({});
  }
  protected render(): string {
    return `
      <div class="modal">
        <div data-slot="1"></div>
      </div>
    `;
  }
}
