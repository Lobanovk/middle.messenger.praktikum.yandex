import { Component } from "core";

export type IncomingProps = {
  title: string;
  type: string;
}

export class LoginFormInputsWrapper extends Component<IncomingProps> {
  static componentName = "LoginFormInputsWrapper";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="content">
        <h3 class="title">{{title}}</h3>
        <div class="inputs_container inputs_container_{{type}}">
            <div data-slot="1"></div>
        </div>
      </div>
    `;
  }
}
