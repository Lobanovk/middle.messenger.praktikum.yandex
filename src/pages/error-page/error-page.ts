import { Component } from "core";

type IncomingProps = {
  type: "404" | "500";
  title: string;
  description: string;
  link: {
    text: string,
    href: string,
  }
}

export class ErrorPage extends Component<IncomingProps> {
  static componentName = "ErrorPage";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      {{#Wrapper type="error wrapper_error-${this.props.type}"}}
        {{{CardError
            title=title
            description=description
            link=link
        }}}
      {{/Wrapper}}
    `;
  }
}
