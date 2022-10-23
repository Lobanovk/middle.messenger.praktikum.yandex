import { Component } from "core";

type IncomingProps = {
  className: string
}

export class ChatWrapper extends Component<IncomingProps> {
  static componentName = "ChatWrapper";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="chat-wrapper {{className}}">
        <div data-slot="1"></div>  
      </div>
    `;
  }
}
