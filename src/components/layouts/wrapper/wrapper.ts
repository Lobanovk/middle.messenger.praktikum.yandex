import { Component } from "core";

type IncomingProps = {
  type: string;
}

export class Wrapper extends Component<IncomingProps> {
  static componentName = "Wrapper";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="wrapper wrapper_{{type}}">
        <div data-slot="1"></div>
      </div>
    `;
  }
}
