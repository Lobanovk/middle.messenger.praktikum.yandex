import {Component} from "../../core";

interface LinkProps {
  text: string;
  href: string;
  modification: string;
  onClick: () => void;
  to: string;
}

import './link.css';

export class Link extends Component {
  static componentName = "Link";

  constructor({ onClick, ...props }: LinkProps) {
    super({...props, events: { click: onClick }});
  }

  protected render(): string {
    return `<a class="link {{ modification }}" href="{{ href }}" data-to="{{ to }}">{{ text }}</a>`
  }
}