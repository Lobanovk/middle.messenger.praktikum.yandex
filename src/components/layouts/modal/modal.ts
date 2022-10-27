import { Component } from "core";

type IncomingProps = {
  onClick: () => void;
}

type Props = {
  events: {
    click: () => void;
  }
}

export class Modal extends Component<Props>{
  static componentName = "Modal";

  constructor({ onClick }: IncomingProps) {
    super({
      events: {
        click: onClick
      }
    });
  }
  protected render(): string {
    return `
      <div id="modal" class="modal">
        <div data-slot="1"></div>
      </div>
    `;
  }
}
