import { Component } from "core";

type IncomingProps = {
  type: string
  modification: string;
  role: string;
  onClick: () => void;
}

type Props = Omit<IncomingProps, "onClick"> & ComponentEvents

export class FabButton extends Component<Props> {
  static componentName = "FabButton";

  constructor({ onClick, type = "button", ...props }: IncomingProps) {
    super({...props, type, events: {
      click: onClick
    }});
  }

  protected render(): string {
    return `
    <button type="{{type}}" class="fab-button {{modification}}" role="{{role}}">
        <div data-slot="1"></div>
    </button>
    `;
  }
}
