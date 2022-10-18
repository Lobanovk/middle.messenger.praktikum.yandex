import { Component } from "core";

type IncomingProps = {
  label: string;
  value: string;
}

export class Text extends Component<IncomingProps> {
  static componentName = "Text";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="profile-information-row">
        <p class="profile-information-row__title">{{label}}</p>
        <p class="profile-information-row__content">{{value}}</p>
      </div>
    `;
  }
}
