import { Component } from "core";

type IncomingProps = {
    onSubmit: () => void;
    className?: string;
}

type Props = Omit<IncomingProps, "onSubmit"> & ComponentEvents

export class Form extends Component<Props> {
  static componentName = "Form";

  constructor({onSubmit, ...props}: IncomingProps) {
    super({ ...props, events: { submit: onSubmit }});
  }

  protected render(): string {
    return `
      <form class="{{className}}">
        <div data-slot="1"></div>
      </form>
    `;
  }
}
