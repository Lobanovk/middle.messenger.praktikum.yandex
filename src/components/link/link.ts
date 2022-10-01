import {Component} from "../../core";

interface LinkProps {
  text: string;
  href: string;
  modification: string;
}

import './link.css';

export class Link extends Component<LinkProps> {
  static componentName = "Link";

  constructor(props: LinkProps) {
    super(props);
  }

  protected render(): string {
    return `<a class="link {{ modification }}" href="{{ href }}">{{ text }}</a>`
  }
}