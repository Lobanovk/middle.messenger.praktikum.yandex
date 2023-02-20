import { Component, Router } from "core";
import { withRouter } from "../../helpers/withRouter";
import { Screens } from "../../helpers/screenList";

type IncomingProps = {
  router: Router;
}

type Props = {
  onGoToChats: () => void;
} & IncomingProps

class BackToChats extends Component<Props> {
  static componentName = "BackToChats";

  constructor(props: IncomingProps) {
    super({
      ...props,
      onGoToChats: () => {
        this.props.router.go(Screens.Messenger);
      }
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

export default withRouter(BackToChats);
