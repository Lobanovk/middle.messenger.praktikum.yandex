import { Component, Router } from "core";
import { withRouter } from "../../helpers/withRouter";
import { Screens } from "../../helpers/screenList";

type IncomingProps = {
  title: string;
  description: string;
  link: {
    text: string;
    href: string;
  },
  router: Router,
}

type Props = IncomingProps & {
  onGoToChats: (event: MouseEvent) => void;
}

class CardError extends Component<Props>{
  static componentName = "CardError";

  constructor(props: IncomingProps) {
    super({
      ...props,
      onGoToChats: event => {
        event.preventDefault();
        this.props.router.go(Screens.Messenger);
      }
    });
  }

  protected render(): string {
    return `
    <div class="card-error">
      <div class="card-error__content">
          <h1 class="title">
              {{ title }}
          </h1>
          <p class="description">
              {{ description }}
          </p>
      </div>
      <div class="card-error__footer">
          {{{Link href=link.href text=link.text onClick=onGoToChats}}}
      </div>
    </div>
    `;
  }
}

export default withRouter(CardError);
