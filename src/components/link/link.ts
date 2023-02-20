import { Component } from "core";

type IncomingProps = {
  text: string;
  href: string;
  modification: string;
  onClick: () => void;
  to: string;
}

type Props = Omit<IncomingProps, "onClick"> & ComponentEvents;

export class Link extends Component<Props> {
  static componentName = "Link";

  constructor({ onClick, ...props }: IncomingProps) {
    super({...props, events: { click: onClick }});
  }

  protected render(): string {
    return `
        <a class="link {{modification}}" href="{{href}}" data-to="{{to}}">{{text}}</a>
    `;
  }
}
