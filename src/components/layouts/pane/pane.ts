import { Component } from "../../../core";
import "./pane.css";

type IncomingProps = {
  DOMRect: DOMRect | null;
}

type Props = IncomingProps;
export class Pane extends Component<Props> {

  static componentName = "Pane";

  constructor(props: IncomingProps) {
    super({
      ...props
    });
  }

  componentDidMount(_props: Props) {
    if (_props.DOMRect) {
      const element = this.element as HTMLDivElement;
      let indent = _props.DOMRect.height + _props.DOMRect.y + 10;
      if (indent >= window.innerHeight) {
        indent = _props.DOMRect.y - element.clientHeight - 10;
      }
      element.style.top = indent + "px";
      element.style.left = _props.DOMRect.left + "px";
      element.classList.remove("pane-abs_hide");
    }
  }

  protected render(): string {
    return `
      <div class="pane-abs pane-abs_hide">
        <div data-slot="1"></div>
      </div>
    `;
  }
}
