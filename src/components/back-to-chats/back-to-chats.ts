import { Component } from "core";

type Props = {
  onGoToChats: () => void;
}

export class BackToChats extends Component<Props> {
  static componentName = "BackToChats";

  constructor() {
    super({
      onGoToChats: () => {}
    });
  }

  protected render(): string {
    return `
      <div class="back-to-chats-content">
        {{#FabButton modification="fab-button_exit fab-button_small fab-button_white-icon" onClick=onGoToChats}}
          {{{ArrowRightIcon }}}
        {{/FabButton}}
      </div>
    `;
  }
}
