import { Component } from "core";

type IncomingProps = {
  className: string
}

export class DoubleCheckIcon extends Component<IncomingProps> {
  static componentName = "DoubleCheckIcon";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="{{className}}" width="11" height="5" viewBox="0 0 11 5">
      <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)"/>
      <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35826 5.00006)"/>
      <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5.00006)"/>
    </svg>
    `;
  }
}
