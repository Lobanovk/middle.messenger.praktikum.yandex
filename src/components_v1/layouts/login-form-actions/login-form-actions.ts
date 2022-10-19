import { Component } from "core";

export type IncomingProps = {
  buttonText: string;
  link: {
    href: string;
    text: string;
  }
}

export class LoginFormActions extends Component<IncomingProps> {
  static componentName = "LoginFormActions";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="actions-login">
        {{{Button text=buttonText}}}
        {{{Link text=link.text href=link.href}}}
      </div>
    `;
  }
}
