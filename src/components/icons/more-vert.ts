import { Component } from "core";

type IncomingProps = {
  className: string
}

export class MoreVertIcon extends Component<IncomingProps> {
  static componentName = "MoreVertIcon";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="{{className}}" width="24px" height="24px" viewBox="0 0 48 48" >
        <circle cx="24" cy="12" r="3"/>
        <circle cx="24" cy="24" r="3"/>
        <circle cx="24" cy="35" r="3"/>
      </svg>
    `;
  }
}
