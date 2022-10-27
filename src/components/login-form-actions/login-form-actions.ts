import { Component, Router } from "core";
import { withRouter } from "../../helpers/withRouter";

export type IncomingProps = {
  buttonText: string;
  link: {
    href: string;
    text: string;
  }
}

type Props = {
  router: Router;
  onGoToNextPage: (event: MouseEvent) => void;
} & IncomingProps;

export class LoginFormActions extends Component<Props> {
  static componentName = "LoginFormActions";

  constructor(props: IncomingProps) {
    super({
      ...props,
      onGoToNextPage: event => {
        event.preventDefault();
        console.log(this.props);
        this.props.router.go(this.props.link.href);
      }
    } as Props);
  }

  protected render(): string {
    return `
      <div class="actions-login"> 
        {{{Button text=buttonText}}}
        {{{Link text=link.text href=link.href to=link.href onClick=onGoToNextPage}}}
      </div>
    `;
  }
}

export default withRouter(LoginFormActions);
